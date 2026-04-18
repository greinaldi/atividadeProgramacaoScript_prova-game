"use client";
import "./style.css"; // Apenas ./ seguido do nome do arquivo
import useGameManager from "./hooks/gameManager";
import Character from "./components/Character";

export default function Home() {
  const { hero, villain, isHeroTurn, message, handleAction } = useGameManager();

  return (
    <main>
      <div className="battle-info">
        <h2 style={{ textAlign: 'center', color: '#282828' }}>{message}</h2>
      </div>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', justifyContent: 'center' }}>
        <Character 
          data={hero} 
          isHero={true} 
          onAction={handleAction} 
          isHeroTurn={isHeroTurn} 
        />

        <Character 
          data={villain} 
          isHero={false} 
          isHeroTurn={isHeroTurn} 
        />
      </div>
    </main>
  );
}