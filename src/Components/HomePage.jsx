// import { Link } from 'react-router';
// import { MagnifyingGlassIcon, DocumentTextIcon, PlusCircleIcon, BookOpenIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
// import { useContext } from 'react';
// import { UserData } from '../ContextAPI/UserData';

// const HomePage = () => {

//   const branches = ['CSE', 'ECE', 'Mechanical', 'Civil', 'Electrical'];
//   const recentMaterials = [
//     {
//       id: 1,
//       title: 'Data Structures Notes',
//       type: 'notes',
//       branch: 'CSE',
//       subject: 'CS201',
//       uploadedBy: 'John Doe',
//       downloads: 142
//     },
//     {
//       id: 2,
//       title: '2023 Exam Papers',
//       type: 'past_papers',
//       branch: 'ECE',
//       subject: 'EC101',
//       uploadedBy: 'Jane Smith',
//       downloads: 89
//     }
//   ];

//   const a = useContext(UserData);
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
//       {/* Header Section */}
//       <div className="max-w-6xl mx-auto mb-12">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800">
//             <AcademicCapIcon className="h-12 w-12 inline-block mr-3 text-blue-600" />
//             UniExamPrep
//           </h1>
//           <Link
//             to="/upload"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
//           >
//             <PlusCircleIcon className="h-5 w-5" />
//             Upload Material
//           </Link>
//         </div>

//         {/* Search Bar */}
//         <div className="bg-white rounded-xl p-4 shadow-lg mb-8">
//           <div className="flex gap-4">
//             <div className="flex-1 relative">
//               <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search materials by title, author, or subject..."
//                 className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <select className="bg-white border border-gray-200 rounded-lg px-4 py-3">
//               <option value="all">All Types</option>
//               <option value="books">Books</option>
//               <option value="notes">Notes</option>
//               <option value="past_papers">Past Papers</option>
//               <option value="tutorials">Tutorials</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Branches Section */}
//       <div className="max-w-6xl mx-auto mb-12">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Branch</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           {branches.map((branch) => (
//             <Link
//               key={branch}
//               to={`/branch/${branch.toLowerCase()}`}
//               className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center"
//             >
//               <BookOpenIcon className="h-8 w-8 mx-auto text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-800">{branch}</h3>
//               <p className="text-sm text-gray-600">120+ Materials</p>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Recent Materials Section */}
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Recently Added Materials </h2>
//         <div className="grid md:grid-cols-2 gap-6">
//           {recentMaterials.map((material) => (
//             <div key={material.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//               <div className="flex items-start gap-4">
//                 <div className="bg-blue-100 p-3 rounded-lg">
//                   {material.type === 'notes' && <AcademicCapIcon className="h-6 w-6 text-blue-600" />}
//                   {material.type === 'past_papers' && <DocumentTextIcon className="h-6 w-6 text-blue-600" />}
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-lg text-gray-800">{material.title}</h3>
//                   <div className="flex gap-4 mt-2 text-sm text-gray-600">
//                     <span>{material.branch}</span>
//                     <span>•</span>
//                     <span>{material.subject}</span>
//                     <span>•</span>
//                     <span>{material.uploadedBy}</span>
//                   </div>
//                   <div className="mt-4 flex items-center gap-4 text-sm">
//                     <span className="bg-gray-100 px-3 py-1 rounded-full">
//                       {material.type.replace('_', ' ')}
//                     </span>
//                     <span className="text-blue-600">
//                       {material.downloads} downloads
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
//         <p>© 2024 UniExamPrep. Connecting Students with Knowledge.</p>
//         <div className="mt-4 flex justify-center gap-6">
//           <Link to="/about" className="hover:text-blue-600">About</Link>
//           <Link to="/contact" className="hover:text-blue-600">Contact</Link>
//           <Link to="/privacy" className="hover:text-blue-600">Privacy</Link>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;

// import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { UserData } from "../ContextAPI/UserData";

// const HomePage = () => {
//   const { Id } = useContext(UserData);

//   const [branches, setBranches] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [materials, setMaterials] = useState([]);

//   const [selectedBranch, setSelectedBranch] = useState("");
//   const [selectedSemester, setSelectedSemester] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");

//   // Fetch all branches on mount
//   useEffect(() => {
//     axios.get("http://localhost:8080/ListBranches")
//       .then(res => setBranches(res.data))
//       .catch(err => console.error("Error fetching branches:", err));
//   }, []);

//   // Fetch semesters when branch changes
//   useEffect(() => {
//     if (!selectedBranch) {
//       setSemesters([]);
//       setSelectedSemester("");
//       return;
//     }
//     axios.get(`http://localhost:8080/ListSem/${selectedBranch}`)
//       .then(res => setSemesters(res.data))
//       .catch(err => console.error("Error fetching semesters:", err));
//   }, [selectedBranch]);

//   // Fetch subjects when semester changes
//   useEffect(() => {
//     if (!selectedSemester) {
//       setSubjects([]);
//       setSelectedSubject("");
//       return;
//     }
//     axios.get(`http://localhost:8080/ListAllSubBySem/${selectedSemester}`)
//       .then(res => setSubjects(res.data))
//       .catch(err => console.error("Error fetching subjects:", err));
//   }, [selectedSemester]);

//   // Fetch materials when subject changes
//   useEffect(() => {
//     if (!selectedSubject) {
//       setMaterials([]);
//       return;
//     }
//     axios.get(`http://localhost:8080/GetMaterialsBySubject/${selectedSubject}`)
//       .then(res => setMaterials(res.data))
//       .catch(err => console.error("Error fetching materials:", err));
//   }, [selectedSubject]);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Study Materials</h1>

//       {/* Filters */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//         <select
//           className="border p-2 rounded"
//           value={selectedBranch}
//           onChange={e => setSelectedBranch(e.target.value)}
//         >
//           <option value="">Select Branch</option>
//           {branches.map(b => (
//             <option key={b.id} value={b.id}>{b.name}</option>
//           ))}
//         </select>

//         <select
//           className="border p-2 rounded"
//           value={selectedSemester}
//           onChange={e => setSelectedSemester(e.target.value)}
//           disabled={!selectedBranch}
//         >
//           <option value="">Select Semester</option>
//           {semesters.map(s => (
//             <option key={s.id} value={s.id}>Semester {s.number}</option>
//           ))}
//         </select>

//         <select
//           className="border p-2 rounded"
//           value={selectedSubject}
//           onChange={e => setSelectedSubject(e.target.value)}
//           disabled={!selectedSemester}
//         >
//           <option value="">Select Subject</option>
//           {subjects.map(sub => (
//             <option key={sub.id} value={sub.id}>{sub.name}</option>
//           ))}
//         </select>
//       </div>

//       {/* Materials List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {materials.map(mat => (
//           <div key={mat.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
//             <h2 className="font-semibold text-xl mb-2">{mat.title}</h2>
//             <p className="text-gray-600 mb-4">{mat.description}</p>
//             <a
//               href={mat.fileUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:underline"
//             >
//               Download PDF
//             </a>
//           </div>
//         ))}
//       </div>

//       {/* Empty state */}
//       {selectedSubject && materials.length === 0 && (
//         <p className="text-center text-gray-500 mt-4">No materials found for this subject.</p>
//       )}
//     </div>
//   );
// };

// export default HomePage;

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { UserData } from "../ContextAPI/UserData";
import Navbar from "./Navbar";
import {
  BookOpenIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const HomePage = () => {
  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [materials, setMaterials] = useState([]);

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const Check = (selectedSemester) => {
    if (selectedSemester % 8 == 0) {
      return 8;
    } else {
      return selectedSemester % 8;
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/ListBranches")
      .then((res) => setBranches(res.data))
      .catch((err) => console.error("Error fetching branches:", err));
  }, []);

  useEffect(() => {
    if (!selectedBranch) {
      setSemesters([]);
      setSelectedSemester("");
      return;
    }
    axios
      .get(`http://localhost:8080/ListSem/${selectedBranch}`)
      .then((res) => setSemesters(res.data))
      .catch((err) => console.error("Error fetching semesters:", err));
  }, [selectedBranch]);

  useEffect(() => {
    if (!selectedSemester) {
      setSubjects([]);
      setSelectedSubject("");
      return;
    }
    axios
      .get(
        `http://localhost:8080/ListAllSubByBranchSem/${selectedBranch}/${Check(
          selectedSemester
        )}`
      )
      .then((res) => setSubjects(res.data))
      .catch((err) => console.error("Error fetching subjects:", err));
  }, [selectedSemester]);

  useEffect(() => {
    if (!selectedSubject) {
      setMaterials([]);
      return;
    }
    axios
      .get(`http://localhost:8080/GetMaterialsBySubject/${selectedSubject}`)
      .then((res) => setMaterials(res.data))
      .catch((err) => console.error("Error fetching materials:", err));
  }, [selectedSubject]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <Navbar />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/3 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="relative pt-24 pb-12 px-4 max-w-6xl mx-auto z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-xl mr-4 shadow-lg">
              <AcademicCapIcon className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Explore Study Materials
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect study resources to ace your exams and master your subjects
          </p>
        </div>

        {/* Filters - Only CSS classes changed */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white mb-12 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <select
                className="w-full pl-4 pr-8 py-3 rounded-xl border-2 border-indigo-200 
                         focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 
                         transition-all appearance-none text-indigo-800 font-medium"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="" disabled>Select Branch</option>
                {branches.map((b, index) => (
                  <option key={index} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
              <BookOpenIcon className="h-5 w-5 absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                className={`w-full pl-4 pr-8 py-3 rounded-xl border-2 border-indigo-200 
                         focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 
                         transition-all appearance-none text-indigo-800 font-medium ${
                           !selectedBranch && "opacity-50"
                         }`}
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                disabled={!selectedBranch}
              >
                <option value="" disabled>Select Semester</option>
                {semesters.map((s) => (
                  <option key={s.id} value={s.id}>
                    Semester {s.number}
                  </option>
                ))}
              </select>
              <AcademicCapIcon className="h-5 w-5 absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                className={`w-full pl-4 pr-8 py-3 rounded-xl border-2 border-indigo-200 
                         focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 
                         transition-all appearance-none text-indigo-800 font-medium ${
                           !selectedSemester && "opacity-50"
                         }`}
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                disabled={!selectedSemester}
              >
                <option value="" disabled>Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
              <DocumentTextIcon className="h-5 w-5 absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div> 

        {/* Materials Grid - Only CSS classes changed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((mat) => (
            <div
              key={mat.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-white animate-fadeIn"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-3 rounded-xl">
                  {mat.type === "notes" && (
                    <AcademicCapIcon className="h-6 w-6 text-indigo-600" />
                  )}
                  {mat.type === "past_papers" && (
                    <DocumentTextIcon className="h-6 w-6 text-indigo-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-indigo-800 mb-2">
                    {mat.title}
                  </h2>
                  {mat.description && (
                    <p className="text-sm text-gray-600 mb-3">
                      {mat.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <UserCircleIcon className="h-4 w-4 text-indigo-500" />
                  <span>{mat.uploadedBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpenIcon className="h-4 w-4 text-indigo-500" />
                  <span>Semester {selectedSemester % 8}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="bg-indigo-100 px-3 py-1 rounded-full text-sm text-indigo-800">
                  {mat.type}
                </span>
                <a
                  href={"http://localhost:8080" + mat.fileUrl}
                  className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state - Only CSS classes changed */}
        {materials.length === 0 && selectedSubject && (
          <div className="text-center mt-12 p-8 bg-white rounded-2xl shadow-lg border border-white animate-fadeIn">
            <p className="text-gray-500 text-lg">
              📭 No materials found for this subject
            </p>
          </div>
        )}
      </div>

      {/* CSS animations */}
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

export default HomePage;

