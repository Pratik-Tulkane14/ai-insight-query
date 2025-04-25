import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import './App.css'
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import Home from './components/Home';
import Layout from './components/Layout';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignInButton />} />
        <Route path="/sign-up" element={<SignUpButton />} />
        <Route
          path="/"
          element={
            // <ProtectedRoute>
               <Layout>
                <Home />
               </Layout>
            // </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
