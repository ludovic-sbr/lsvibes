import React, { useEffect, useState } from 'react'
import WebsiteLogo from "../../assets/images/logo-minimalist.png";

function Preloader() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    let timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className={loading ? "preloader showed" : "preloader"}>
      <img src={WebsiteLogo} alt="img" />
      <p> Chargement en cours... </p>
      <div className="pbar">
        <div className="inner" />
      </div>
    </div>
  );
};

export default Preloader;