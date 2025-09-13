
/*
//نسخة رائعه 8-9-2025 كامل بدون فصل الاوثنتيكيشن عن الapp
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import RouterComponent from "./Router";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState(""); 
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate(); // التوجيه

  useEffect(() => {
    const getSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        fetchProfile(user.id);
      }
    };
    getSession();


    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          fetchProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const fetchProfile = async (id) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) {
      setProfile(data);

      // التوجيه حسب الدور
      // التوجيه حسب الدور
/*if (data.role === "teacher") navigate("/TeacherDashboard");
else if (data.role === "student") navigate("/StudentDashboard");//////////////////
if (data.role === "teacher") navigate("/teacher");
else if (data.role === "student") navigate("/student");
    } 
  };

  const handleSignUp = async () => {
    if (!role) return alert("الرجاء اختيار الدور أولاً!");

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return alert(error.message);

    const userId = data.user?.id;
    if (!userId) return;

    // تحديث البيانات في جدول profiles
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ full_name: fullName, points: 0, role })
      .eq("id", userId);

    if (profileError) return alert(profileError.message);

    setUser(data.user);
    fetchProfile(userId); // التوجيه بعد التسجيل تلقائيًا
    alert("تم إنشاء الحساب بنجاح، تحقق من بريدك الإلكتروني 👌");
  };

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);

    setUser(data.user);
    fetchProfile(data.user.id); // التوجيه بعد تسجيل الدخول
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  // 🟢 إذا المستخدم غير مسجل دخول → نعرض صفحة تسجيل الدخول
  if (!user) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-8">
        {!user ? (
          <>
            <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
              🌟 منصة الرياضيات للأطفال 🌟
            </h1>
            <p className="text-center text-gray-700 mb-4">
              تعلم الرياضيات بطريقة ممتعة!
            </p>

            <input
              className="w-full p-3 mb-3 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-400"
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full p-3 mb-3 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-400"
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-full p-3 mb-3 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-400"
              type="text"
              placeholder="الاسم الكامل (اختياري)"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            {/* اختيار الدور /}
            <select
              className="w-full p-3 mb-3 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-400"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">اختر دورك</option>
              <option value="student">طالب</option>
              <option value="teacher">معلم</option>
            </select>

            <div className="flex gap-4 justify-center mt-4">
              <button
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all"
                onClick={handleSignUp}
              >
                إنشاء حساب
              </button>
              <button
                className="bg-green-400 hover:bg-green-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all"
                onClick={handleSignIn}
              >
                تسجيل الدخول
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              مرحباً، {profile?.full_name || "مستخدم جديد"} 👋
            </h2>
            <p className="text-gray-700 mb-2">📧 البريد: {user.email}</p>
            <p className="text-yellow-500 font-bold mb-4">
              ⭐ النقاط: {profile?.points || 0}
            </p>

            <button
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all"
              onClick={handleSignOut}
            >
              تسجيل الخروج
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

  return (
  <RouterComponent
    user={user}
    profile={profile}
    setProfile={setProfile}
    handleSignOut={handleSignOut}
  />
);
}*/
// src/App.jsx
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import RouterComponent from "./Router";
import AuthForm from "./AuthPage";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        await fetchProfile(user.id);
      }
      setLoading(false);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const fetchProfile = async (id) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      setProfile(data);
      if (data.role === "teacher") navigate("/teacher");
      else if (data.role === "student") navigate("/student");
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    if (!role) return alert("الرجاء اختيار الدور أولاً!");
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return alert(error.message);

    const userId = data.user?.id;
    if (!userId) return;

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ full_name: fullName, points: 0, role })
      .eq("id", userId);

    if (profileError) return alert(profileError.message);

    setUser(data.user);
    await fetchProfile(userId);
    alert("تم إنشاء الحساب بنجاح، تحقق من بريدك الإلكتروني 👌");
  };

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);

    setUser(data.user);
    await fetchProfile(data.user.id);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-bold text-gray-600">جار التحميل ...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        fullName={fullName}
        setFullName={setFullName}
        role={role}
        setRole={setRole}
        handleSignUp={handleSignUp}
        handleSignIn={handleSignIn}
      />
    );
  }

  return (
    <RouterComponent
      user={user}
      profile={profile}
      setProfile={setProfile}
      handleSignOut={handleSignOut}
    />
  );
}
