
// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import BackgroundShapesWithMath from "../components/BackgroundShapesKidsDynamic";

export default function Dashboard() {
  const navigate = useNavigate();
  const [classStats, setClassStats] = useState([]);
  const [topClassId, setTopClassId] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    const { data: classesData, error: classesError } = await supabase
      .from("classes")
      .select("id, name");
    if (classesError) return console.error(classesError.message);

    const { data: studentsData, error: studentsError } = await supabase
      .from("profiles")
      .select("id, full_name, points, class_id");
    if (studentsError) return console.error(studentsError.message);

    const stats = classesData.map((cls) => {
      const classStudents = studentsData.filter(s => s.class_id === cls.id);

      // لا يوجد طلاب
      if (classStudents.length === 0) {
        return {
          ...cls,
          topStudent: { full_name: "لا يوجد طلاب", points: 0 },
          totalPoints: 0
        };
      }

      // تحويل النقاط لأرقام
      const classStudentsWithPoints = classStudents.map(s => ({
        ...s,
        points: Number(s.points) || 0
      }));

      // أعلى طالب
      const topStudent = classStudentsWithPoints.reduce((prev, curr) => {
        return curr.points > prev.points ? curr : prev;
      }, classStudentsWithPoints[0]);

      // مجموع النقاط
      const totalPoints = classStudentsWithPoints.reduce((sum, s) => sum + s.points, 0);

      return { ...cls, topStudent, totalPoints };
    });

    setClassStats(stats);

    // تحديد الصف صاحب أعلى مجموع نقاط
    if (stats.length > 0) {
      let topClass = stats[0]; // البداية بالصف الأول
      stats.forEach(cls => {
        if (cls.totalPoints > topClass.totalPoints) {
          topClass = cls;
        }
      });
      setTopClassId(topClass.id);
    }
  };

  fetchData();
}, []);


  return (
    <div className="relative min-h-screen flex flex-col items-center pt-10 "style={{ backgroundColor: "#eafe6a" }}>
      {/* الخلفية الديناميكية */}
      <BackgroundShapesWithMath shapeCount={30} maxMath={3} />

      {/* زر إغلاق أعلى يمين */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500 text-white font-bold text-lg flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
        title="عودة"
      >
        ×
      </button>

      {/* اسم المعلمة */}
      <h2 className="text-5xl md:text-7xl text-center font-extrabold text-purple-700 mb-8 drop-shadow-lg">
        Nazera Alnajjar
      </h2>

      <p className="text-center text-4xl   text-gray-700 mb-10 text-lg">
        Numix
      </p>

      {/* مربعات الصفوف */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {classStats.map((cls) => (
          <div
            key={cls.id}
            className={`rounded-2xl p-6 shadow-lg text-center transition-transform transform hover:scale-105
              ${
                cls.id === topClassId
                  ? "bg-yellow-200 border-4 border-yellow-500"
                  : cls.topStudent.full_name === "لا يوجد طلاب"
                  ? "bg-gray-100 text-gray-400"
                  : "bg-white bg-opacity-80"
              }
            `}
          >
            <h3 className="text-2xl font-bold text-purple-700 mb-2">{cls.name}</h3>
            <p className="text-lg text-gray-800">
    الطالب صاحب اعلى نقاط في الصف: 🥇 <span className="font-semibold">{cls.topStudent.full_name}</span>
            </p>
            <p className="text-gray-700">
              نقاطه: {cls.topStudent.points}
            </p>
            <p className="text-gray-700 mt-2 font-medium">
              مجموع نقاط الصف: {cls.totalPoints}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


