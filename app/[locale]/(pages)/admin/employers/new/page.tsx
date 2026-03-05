'use client'
import React, {useEffect} from 'react';
interface EmployerPost {
    id: number;
    post: string;
}
const Page = () => {
    const [name, setName] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [postIds, setPostIds] = React.useState<number[]>([]);
    const [availablePost, setAvailablePost] = React.useState<EmployerPost[]>([]);
    const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
    useEffect(() => {
        fetch('/api/admin/employer-post')
            .then(res => res.json())
            .then(data => setAvailablePost(data));
    }, [])
    const handleCheckbox = (id: number) => {
        setPostIds(prev =>
            prev.includes(id)
                ? prev.filter(p => p !== id)
                : [...prev, id]
        );
    };
    const handleSubmit = async () => {
        try {
            const res = await fetch('/api/admin/employers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, lastname, postIds })
            });

            if (!res.ok) throw new Error();

            // Очищаем форму
            setName('');
            setLastname('');
            setPostIds([]);
            setStatus('success');

        } catch {
            setStatus('error');
        }
    };
    return (
        <div>
            <label>ИМЯ</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <label>ФАМИЛИЯ</label>
            <input value={lastname} onChange={(e) => setLastname(e.target.value)} />
            <label>ДОЛЖНОСТЬ</label>
            {availablePost.map((post) => (
                <div key={post.id}>
                    <input
                        type="checkbox"
                        id={String(post.id)}
                        value={post.id}
                        checked={postIds.includes(post.id)}
                        onChange={() => handleCheckbox(post.id)}
                    />
                    <label htmlFor={String(post.id)}>{post.post}</label>
                </div>
            ))}
            <button onClick={handleSubmit}>Добавить</button>

            {status === 'success' && <p>Сотрудник успешно добавлен!</p>}
            {status === 'error' && <p>Ошибка, попробуйте снова</p>}
        </div>
    );
};

export default Page;