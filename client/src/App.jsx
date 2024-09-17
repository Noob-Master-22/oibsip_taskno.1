import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Texteditor from "./Texteditor";

function App() {
  const documentId = uuidV4();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/documents/${documentId}`} />}
        />
        <Route path="/documents/:id" element={<Texteditor />} />
      </Routes>
    </Router>
  );
}

export default App;
