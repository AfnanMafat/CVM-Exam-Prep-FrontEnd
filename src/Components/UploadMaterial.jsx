import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";
import { UserData } from "../ContextAPI/UserData";
import Navbar from "./Navbar";

const UploadMaterial = () => {
  const { Id = 2 } = useContext(UserData);

  const Check = (selectedSemester) => {
    if (selectedSemester % 8 == 0) {
      return 8;
    } else {
      return selectedSemester % 8;
    }
  };

  delete axios.defaults.headers.post["Content-Type"];
  axios.defaults.transformRequest = [(data) => data];

  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    branch: "",
    semester: "",
    subject: "",
    title: "",
    description: "",
    file: null,
  });

  const navigate = useNavigate();

  const FetchBranches = () => {
    axios.get("http://localhost:8080/ListBranches").then((res) => {
      setBranches(res.data);
    });
  };

  useEffect(() => {
    FetchBranches();
  }, []);

  const FetchSemsters = () => {
    if (formData.branch) {
      axios
        .get(`http://localhost:8080/ListSem/${formData.branch}`)
        .then((res) => {
          setSemesters(res.data);
        });
    }
  };

  useEffect(() => {
    FetchSemsters();
  }, [formData.branch]);

  console.log(formData);

  const FetchSubject = () => {
    if (formData.branch && formData.semester) {
      axios
        .get(
          `http://localhost:8080/ListAllSubByBranchSem/${
            formData.branch
          }/${Check(formData.semester)}`
        )
        .then((res) => setSubjects(res.data))
        .catch((err) => console.error("Error fetching subjects:", err));
    }
  };
  // ListAllSubByBranchSem/{bid}/{id}

  useEffect(() => {
    FetchSubject();
  }, [formData.branch, formData.semester]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("subjectId", formData.subject);
    payload.append("uploadedById", Id);
    payload.append("file", formData.file);

    for (let [key, value] of payload.entries()) {
      console.log("Payload entry:", key, value);
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/UploadMaterial",
        payload
      );
      console.log("Saved material:", res.data);
      alert("Upload successful!");
      navigate("/HomePage");

      setFormData({
        branch: "",
        semester: "",
        subject: "",
        title: "",
        description: "",
        file: null,
      });
      setSemesters([]);
      setSubjects([]);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please try again.");
    }
  };

   return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <Navbar />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/3 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="relative pt-24 pb-12 px-4 max-w-4xl mx-auto z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-xl mr-4 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Share Your Knowledge
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload study materials to help your peers succeed in their academic journey
          </p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white transform transition-all duration-500 hover:shadow-3xl">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white">Upload Study Material</h2>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="animate-fadeIn">
                  <label className="block text-indigo-800 text-lg font-bold mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Branch
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        branch: e.target.value,
                        semester: "",
                        subject: "",
                      })
                    }
                    className="w-full px-5 py-3 rounded-xl border-2 border-indigo-200 bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md text-indigo-800 font-medium"
                    required
                  >
                    <option value="" disabled>Select Branch</option>
                    {branches.map((branch, index) => (
                      <option key={index} value={branch.id} className="text-indigo-800">
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.branch && (
                  <div className="animate-fadeIn">
                    <label className="block text-indigo-800 text-lg font-bold mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Semester
                    </label>
                    <select
                      value={formData.semester}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          semester: e.target.value,
                          subject: "",
                        })
                      }
                      className="w-full px-5 py-3 rounded-xl border-2 border-indigo-200 bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md text-indigo-800 font-medium"
                      required
                    >
                      <option value="" disabled>Select Semester</option>
                      {semesters.map((semester) => (
                        <option key={semester.id} value={semester.id} className="text-indigo-800">
                          Semester {semester.number}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {formData.semester && (
                  <div className="animate-fadeIn">
                    <label className="block text-indigo-800 text-lg font-bold mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-5 py-3 rounded-xl border-2 border-indigo-200 bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md text-indigo-800 font-medium"
                      required
                    >
                      <option value="" disabled>Select Subject</option>
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id} className="text-indigo-800">
                          {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {formData.subject && (
                <div className="space-y-8">
                  <div className="animate-fadeIn">
                    <label className="block text-indigo-800 text-lg font-bold mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      </svg>
                      File Upload
                    </label>
                    
                    <div className="flex flex-col items-center justify-center border-3 border-dashed border-indigo-300 rounded-2xl p-8 bg-gradient-to-br from-white to-indigo-50 cursor-pointer transition-all hover:border-indigo-500 hover:shadow-md">
                      <input 
                        type="file" 
                        onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        required
                      />
                      <label htmlFor="file-upload" className="cursor-pointer text-center">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        
                        {formData.file ? (
                          <div className="text-center">
                            <p className="text-lg font-bold text-indigo-800">File Selected:</p>
                            <p className="text-indigo-700 font-medium truncate max-w-xs">{formData.file.name}</p>
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData({...formData, file: null})
                              }}
                              className="mt-4 text-red-500 hover:text-red-700 font-medium flex items-center justify-center gap-1 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              Remove File
                            </button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <p className="text-lg font-bold text-indigo-700 mb-2">Click to upload your file</p>
                            <p className="text-indigo-600">Drag & drop your file here</p>
                            <p className="text-sm text-indigo-500 mt-2">Supported formats: PDF, DOC, PPT (MAX 20MB)</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
                    <div>
                      <label className="block text-indigo-800 text-lg font-bold mb-3 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full px-5 py-3 rounded-xl border-2 border-indigo-200 bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all shadow-sm text-indigo-800 font-medium"
                        placeholder="Enter material title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-indigo-800 text-lg font-bold mb-3 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        className="w-full px-5 py-3 rounded-xl border-2 border-indigo-200 bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all shadow-sm text-indigo-800 font-medium"
                        placeholder="Enter description"
                        rows="4"
                      />
                    </div>
                  </div>

                  <div className="pt-6 animate-fadeIn">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <span className="material-icons-round animate-bounce">file_upload</span>
                      Upload Material
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default UploadMaterial;