import { useEffect, useRef, useState } from 'react';
import "../style/App.css";; // 確保此路徑正確
import { asyncGet } from '../utils/fetch'; // 修改為您的 fetch 工具路徑
import { api } from '../enum/api'; // 修改為您的 api 定義路徑
import { Student } from '../interface/Student'; // 修改為您的 Student 介面定義路徑
import { resp } from '../interface/resp'; // 修改為您的 resp 介面定義路徑
import { Link } from 'react-router';

function App() {
  const [students, setStudents] = useState<Array<Student>>([]); // 學生資料狀態
  const cache = useRef<boolean>(false); // 用於緩存避免多次請求

  useEffect(() => {
    if (!cache.current) {
      cache.current = true;
      asyncGet(api.findAll)
        .then((res: resp<Array<Student>>) => {
          console.log("API 返回結果：", res); // 確認 API 返回的數據
          if (res.code === 200) {
            setStudents(res.body); // 設置學生資料
          } else {
            console.error("查詢資料失敗：", res.message);
          }
        })
        .catch((error) => {
          console.error("API 請求錯誤：", error);
        });
    }
  }, []);

  // 生成學生卡片
  const studentCards = students.length > 0
    ? students.map((student: Student) => (
        <div className="student" key={student._id}>
          <h1>{student.name}</h1>
          <p>帳號: {student.userName}</p>
          <p>座號: {student.sid}</p>
          <p>院系: {student.department}</p>
          <p>年級: {student.grade}</p>
          <p>班級: {student.class}</p>
          <p>Email: {student.Email}</p>
          <p>缺席次數: {student.absences ?? 0}</p>
        </div>
      ))
    : (
      <div className="no-data">
        <p>目前無學生資料，請新增學生。</p>
      </div>
    );

  return (
    <div id="root">
      {/* 側邊欄 */}
      <div className="sidebar">
        <h2>StudentHub</h2>
        <nav>
          <Link to="/" className="nav-button">首頁</Link>
          <Link to="/all" className="nav-button">所有學生</Link>
          <Link to="/create" className="nav-button">新增學生</Link>
          <Link to="/update" className="nav-button">修改學生資料</Link>
          <Link to="/delete" className="nav-button">刪除學生資料</Link>
        </nav>
      </div>

      {/* 主內容 */}
      <div className="main-content">
        {studentCards}
      </div>
    </div>
  );
}

export default App;
