import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/templates/PublicLayout';
import AuthLayout from './components/templates/AuthLayout';
import DashboardLayout from './components/templates/DashboardLayout';
import CourseLayout from './components/templates/CourseLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import Landing from './pages/Landing';
import Catalog from './pages/Catalog';
import CourseDetail from './pages/CourseDetail';
import LessonView from './pages/LessonView';
import Student from './pages/Dashboard/Student';
import Instructor from './pages/Dashboard/Instructor';
import CourseBuilder from './pages/Instructor/CourseBuilder';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Checkout from './pages/Checkout/Checkout';
import Orders from './pages/Orders/Orders';
import Profile from './pages/Profile/Profile';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/lesson/:courseId/:lessonId" element={<LessonView />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute roles={['student', 'instructor', 'admin']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Student />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute roles={['instructor', 'admin']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/instructor/builder/:id" element={<CourseBuilder />} />
        </Route>
      </Route>
      <Route element={<CourseLayout />}>
        {/* fallback */}
      </Route>
    </Routes>
  );
}
