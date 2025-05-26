import { useState, useEffect } from "react";
import axios from "axios";

const UploadMaterial = () => {
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
        axios.get(`http://localhost:8080/ListAllSubBySem/${formData.semester}`)
          .then(res => setSubjects(res.data))
          .catch(err => console.error('Error fetching subjects:', err));
      }
  }

  useEffect(()=>{
    FetchSubject()
  },[formData.branch, formData.semester])

  // Fetch branches on mount
  //   useEffect(() => {
  //     axios.get('/api/branches')
  //       .then(res => setBranches(res.data))
  //       .catch(err => console.error('Error fetching branches:', err));
  //   }, []);

  // Fetch semesters when branch changes
  //   useEffect(() => {
  //     if (formData.branch) {
  //       axios.get(`/api/semesters?branch=${formData.branch}`)
  //         .then(res => setSemesters(res.data))
  //         .catch(err => console.error('Error fetching semesters:', err));
  //     }
  //   }, [formData.branch]);

  // Fetch subjects when semester changes
  //   useEffect(() => {
  //     if (formData.branch && formData.semester) {
  //       axios.get(`/api/subjects?branch=${formData.branch}&semester=${formData.semester}`)
  //         .then(res => setSubjects(res.data))
  //         .catch(err => console.error('Error fetching subjects:', err));
  //     }
  //   }, [formData.branch, formData.semester]);

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const formPayload = new FormData();
  //     formPayload.append('title', formData.title);
  //     formPayload.append('description', formData.description);
  //     formPayload.append('file', formData.file);
  //     formPayload.append('subject', formData.subject);

  //     try {
  //       await axios.post('/api/materials', formPayload);
  //       alert('Material uploaded successfully!');
  //       // Reset form
  //       setFormData({
  //         branch: '',
  //         semester: '',
  //         subject: '',
  //         title: '',
  //         description: '',
  //         file: null
  //       });
  //     } catch (error) {
  //       console.error('Upload failed:', error);
  //       alert('Upload failed. Please try again.');
  //     }
  //   };

  const handleSubmit = () => {};
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Upload Study Material
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Branch Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Branch</option>
            {branches.map((value) => (
              <option key={value.id} value={value.id}>
                {value.name}
              </option>
            ))}
          </select>
        </div>

        {/* Semester Dropdown */}
        {formData.branch && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Semester</option>
              {semesters.map((semester) => (
                <option key={semester.id} value={semester.id}>
                  Semester {semester.number}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Subject Dropdown */}
        {formData.semester && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* File Upload */}
        {formData.subject && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, file: e.target.files[0] })
                }
                className="w-full p-2 border rounded-md"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                required
              />
            </div>

            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                placeholder="Enter material title"
                required
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                placeholder="Enter description"
                rows="3"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Upload Material
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default UploadMaterial;
