"use client";
import { useState, useCallback, useEffect } from "react";

export default function useGameManager() {
  const [hero, setHero] = useState({ 
    name: "Guerreiro", 
    life: 100, 
    defense: false, 
    potions: 3,
    image: "/guerreiro.png" // Caminho para a pasta public
  });
  
  const [enemy, setEnemy] = useState({ 
    name: "Goblin", 
    life: 100, 
    defense: false,
    image: "/goblin.png" // Caminho para a pasta public
  });

  const [isHeroTurn, setIsHeroTurn] = useState(true);
  const [message, setMessage] = useState("Batalha iniciada!");

  const updateMessage = (text) => {
    setMessage(text);
  };

  const enemyTurn = useCallback(() => {
    setEnemy((currEnemy) => {
      if (currEnemy.life > 0) {
        const dmg = Math.floor(Math.random() * 10) + 5;
        setHero((h) => {
          const finalDmg = h.defense ? Math.floor(dmg * 0.5) : dmg;
          updateMessage(`O ${currEnemy.name} atacou causando ${finalDmg} de dano!`); 
          return { ...h, life: Math.max(0, h.life - finalDmg), defense: false };
        });
        setIsHeroTurn(true);
      }
      return currEnemy;
    });
  }, []);

  const handleHeroAction = (action) => {
    if (!isHeroTurn || hero.life <= 0 || enemy.life <= 0) return;

    if (action === "attack") {
      const dmg = Math.floor(Math.random() * 15) + 5;
      setEnemy((e) => ({ ...e, life: Math.max(0, e.life - dmg) }));
      updateMessage(`Você atacou o ${enemy.name}!`);
    } 
    else if (action === "defense") {
      setHero((h) => ({ ...h, defense: true }));
      updateMessage("Você se preparou para defender!");
    } 
    else if (action === "usePotion") {
      if (hero.potions > 0) {
        setHero((h) => ({ 
          ...h, 
          life: Math.min(100, h.life + 30), 
          potions: h.potions - 1 
        }));
        updateMessage("Você usou uma poção e recuperou 30 de vida!");
      } else {
        updateMessage("Você não tem mais poções!");
        return;
      }
    } 
    else if (action === "flee") {
      updateMessage("Você fugiu da batalha!");
      setIsHeroTurn(false);
      return;
    }

    setIsHeroTurn(false);
    setTimeout(enemyTurn, 1000);
  };

  useEffect(() => {
    if (enemy.life <= 0) updateMessage("Vitória! O inimigo foi derrotado.");
    else if (hero.life <= 0) updateMessage("Derrota! Você caiu em combate.");
  }, [hero.life, enemy.life]);

  return { 
    hero, 
    villain: enemy, 
    isHeroTurn, 
    message, 
    handleAction: handleHeroAction 
  };
}