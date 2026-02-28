"use client"
import {useEffect, useState} from "react";
import {Cat} from "@/app/[locale]/entities";

export default function HomePage() {
    const [cats, setCats] = useState<Cat[]>([]);

    useEffect(() => {
        fetch('/api/cat')
            .then(res => res.json())
            .then(data => {
                setCats(data);
                console.log("Коты из fetch (должно быть в браузере):", data);
                console.dir(data);
            })
            .catch(err => console.error("Ошибка:", err));
    }, []);

  return (

      <main>
TESSSSSSSSSSSSST
          {cats.map((cat: Cat) => (<div key={cat.id}>{cat.name}</div>))}
      </main>
  );
}
