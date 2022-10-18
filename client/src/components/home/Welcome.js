import React, { useEffect, useState } from 'react'
import api from '../../utils/api';

import FiveMLogo from "../../assets/images/fivem-logo.png"
import DiscordLogo from '../../assets/images/traced.svg';
import DiscordVector from '../../assets/images/discord_vector.svg';
import Arrow from '../../assets/images/arrow.svg';
import { MdLink } from 'react-icons/md'

const Welcome = () => {
  const [playersCount, setPlayersCount] = useState(0)
  const [maxPlayers, setMaxPlayers] = useState(1024)
  const perc = (playersCount / maxPlayers) * 100

  useEffect(() => {
    api.post("/fivemapi/players")
    .then(res => {
      setPlayersCount(res.data.value)
    });

    api.post('/fivemapi/server-infos')
    .then(res => {
      setMaxPlayers(res.data.value)
    });
  });

  return (
    <div className="row section-welcome">
      <div className="col-12 col-lg-11 col-lg-9 col-xl-7 mx-auto">
        <div className="row title mb-5">
          <h1 className="text-center text-lg-start"> BIENVENUE SUR </h1>
          <h1
            className="text-center text-lg-start"
            style={{fontSize: "80px", fontFamily: "EudoxusSans-ExtraBold"}}
          >
            LOS SANT<span className="edito">O</span>S VIBES
          </h1>
        </div>
        <div className="row">
          <div className="d-none d-lg-block col-md-4">
            <img className="traced d-none d-lg-block" src={DiscordLogo} alt='#' />
            <a href="https://discord.gg/TU9UpTkeup" target="_blank" rel="noreferrer">
              <div className="btn-discord">
                <img className="logo" src={DiscordVector} alt='#' />
                <img className="arrow" src={Arrow} alt="#" />
                <div className="content">NOUS REJOINDRE</div>
              </div>
            </a>
          </div>
          <div className="col-12 col-lg-8 d-flex justify-content-center">
            <div className="homeBox">
              <header className="mx-auto">
                <img src={FiveMLogo} alt="" />
                <span>LS Vibes</span>
              </header>
              <section className="mx-auto">
                <span className="me-3"> {playersCount}/{maxPlayers} </span>
                <div className="progress">
                  <div className="progress-bar" role="progressbar"
                       aria-valuenow={perc} style={{width: perc + "%"}} aria-valuemin="0"
                       aria-valuemax="100" />
                </div>
              </section>
              <footer className="mx-auto">
                <a href="fivem://connect/193.70.36.221:30120">
                  <button className="btn btn-primary">
                    <span>lsvibes.net <MdLink className="btn-icon" /></span>
                  </button>
                </a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome