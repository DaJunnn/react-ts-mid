import { useState } from 'react';
import { asyncPost } from '../utils/fetch';
import { api } from '../enum/api';

function CreateData() {
  const [formData, setFormData] = useState({
    userName: '',
    sid: '',
    name: '',
    department: '',
    grade: '',
    class: '',
    Email: '',
    absences: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await asyncPost(api.create, formData);
      if (res.code === 200) {
        alert('資料新增成功！');
      } else {
        alert(`新增失敗：${res.message}`);
      }
    } catch (error) {
      console.error('新增資料錯誤', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>新增學生資料</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>
              {key}:
              <input
                type="text"
                name={key}
                value={formData[key as keyof typeof formData] as string}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}
        <button type="submit">新增</button>
      </form>
    </div>
  );
}

export default CreateData;
