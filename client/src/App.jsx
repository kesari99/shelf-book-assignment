// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import BookList from "./pages/BookList";
import EditBook from "./pages/EditBook";
import AddBook from "./pages/AddBook";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        
        {/* Allow both owner and seeker to access book-list */}
        <Route 
          path="/book-list" 
          element={<ProtectedRoute element={<BookList />} requiredRoles={['owner', 'seeker']} />} 
        />
        
        {/* Only owner can access these routes */}
        <Route 
          path="/add-book" 
          element={<ProtectedRoute element={<AddBook />} requiredRoles={['owner']} />} 
        />
        <Route 
          path="/edit-book" 
          element={<ProtectedRoute element={<EditBook />} requiredRoles={['owner']} />} 
        />
        
        <Route 
          path="/profile" 
          element={<ProtectedRoute element={<Profile />} />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;