

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Navbar from "../Navbar";

export default function TeacherDashboard() {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // للتحكم في drawer على الشاشات الصغيرة


  const navigate = useNavigate(); // للتوجيه



  useEffect(() => {
    const getUserAndData = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) return console.error("Error fetching user:", userError.message);

      if (user) {
        setUser(user);
        await fetchProfile(user.id);
        await fetchClasses(user.id);
      }
    };
    getUserAndData();
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err.message);
    }
  };

  const fetchClasses = async (teacherId) => {
    try {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .eq("teacher_id", teacherId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setClasses(data);
    } catch (err) {
      console.error("Error fetching classes:", err.message);
    }
  };

  const handleAddClass = async () => {
    if (!newClassName.trim()) return alert("الرجاء كتابة اسم الصف");
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("classes")
        .insert([{ name: newClassName, teacher_id: user.id }])
        .select();
      if (error) throw error;

      setClasses((prev) => [data[0], ...prev]);
      setNewClassName("");
    } catch (err) {
      alert("حدث خطأ عند إضافة الصف: " + err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      navigate("/");
    } catch (err) {
      console.error("Error signing out:", err.message);
    }
  };

  const handleClassClick = (classId) => {
    navigate(`/class/${classId}`);
    setIsSidebarOpen(false); // إغلاق sidebar على الشاشات الصغيرة عند اختيار صف
  };

  return (
    <div className="min-h-screen flex flex-col">
    <Navbar user={user} profile={profile} handleSignOut={handleSignOut} />


      <div className="flex flex-1">
        {/* زر فتح/غلق sidebar على الشاشات الصغيرة */}
        <button
          className="sm:hidden p-2 m-2 bg-purple-500 text-white rounded"
          onClick={() => setIsSidebarOpen(true)}
        >
          ☰ الصفوف
        </button>
{/* Sidebar* */}
<div
  className={`fixed inset-y-0 left-0 bg-gray-100 p-4 border-r w-64 transform transition-transform duration-300 ease-in-out
  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
  sm:translate-x-0 sm:relative sm:flex flex-col`} // <-- إضافة flex-col هنا
>
  <h2 className="text-xl font-bold mb-4">صفوفك</h2>
  <div className="flex flex-col space-y-2 flex-1 overflow-y-auto"> {/* حاوية الصفوف */}
    {classes.length === 0 ? (
      <p>لا يوجد صفوف بعد.</p>
    ) : (
      classes.map((cls) => (
        <div
          key={cls.id}
          className="p-2 bg-white rounded shadow cursor-pointer hover:bg-purple-100"
          onClick={() => handleClassClick(cls.id)}
        >
          {cls.name}
        </div>
      ))
    )}
  </div>

  <div className="mt-6">
    <input
      type="text"
      placeholder="اسم الصف الجديد"
      className="w-full p-2 border rounded mb-2"
      value={newClassName}
      onChange={(e) => setNewClassName(e.target.value)}
    />
    <button
      className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded font-bold"
      onClick={handleAddClass}
    >
      إضافة صف جديد
    </button>
  </div>

  {/* زر إغلاق sidebar على الشاشات الصغيرة */}
  <button
    className="sm:hidden mt-4 p-2 w-full bg-red-500 text-white rounded"
    onClick={() => setIsSidebarOpen(false)}
  >
    إغلاق
  </button>
</div>


        {/* Main content area*/}
        <div className="flex-1 p-6 sm:ml-64">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">
            لوحة تحكم المعلمة
          </h1>
          <p className="text-gray-700">
            اختر أي صف من الشريط الجانبي لرؤية الدروس الخاصة به.
          </p>
        </div>
      </div>
    </div>
  );
}
