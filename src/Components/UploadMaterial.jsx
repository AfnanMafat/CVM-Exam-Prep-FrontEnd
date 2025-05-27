import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";
import { UserData } from "../ContextAPI/UserData";
import Navbar from "./Navbar";

const UploadMaterial = () => {

  const {Id} = useContext(UserData);

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

  const FetchSubject = () => {
    if (formData.branch && formData.semester) {
      axios
        .get(`http://localhost:8080/ListAllSubBySem/${formData.semester}`)
        .then((res) => setSubjects(res.data))
        .catch((err) => console.error("Error fetching subjects:", err));
    }
  };

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
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
            <span className="material-icons-round text-4xl text-blue-600">upload</span>
            Upload Study Material
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Branch Dropdown */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center gap-2">
                <span className="material-icons-round text-lg">school</span>
                Branch
              </label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({...formData, branch: e.target.value, semester: "", subject: ""})}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                required
              >
                <option value="" disabled>Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>{branch.name}</option>
                ))}
              </select>
            </div>

            {/* Semester Dropdown */}
            {formData.branch && (
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center gap-2">
                  <span className="material-icons-round text-lg">calendar_today</span>
                  Semester
                </label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({...formData, semester: e.target.value, subject: ""})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                  required
                >
                  <option value="" disabled>Select Semester</option>
                  {semesters.map((semester) => (
                    <option key={semester.id} value={semester.id}>Semester {semester.number}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Subject Dropdown */}
            {formData.semester && (
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center gap-2">
                  <span className="material-icons-round text-lg">menu_book</span>
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                  required
                >
                  <option value="" disabled>Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                  ))}
                </select>
              </div>
            )}

            {formData.subject && (
              <>
                {/* File Upload */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center gap-2">
                    <span className="material-icons-round text-lg">attach_file</span>
                    File Upload
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col w-full border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-xl cursor-pointer transition-all">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <span className="material-icons-round text-4xl text-gray-400 mb-2">cloud_upload</span>
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOC, PPT (MAX. 20MB)</p>
                      </div>
                      <input 
                        type="file" 
                        onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        required
                      />
                    </label>
                  </div>
                </div>

                {/* Title Input */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center gap-2">
                    <span className="material-icons-round text-lg">title</span>
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                    placeholder="Enter material title"
                    required
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center gap-2">
                    <span className="material-icons-round text-lg">description</span>
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                    placeholder="Enter description"
                    rows="4"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <span className="material-icons-round">upload</span>
                  Upload Material
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadMaterial;
