import React from 'react'

const Informations = ({ user }) => {
  return (
    <div className="informations">
      Username : { user.username }
      <br />
      Email : { user.email }
      <br />
      Email vérifié : { user.isEmailVerified ? "Oui" : "Non" }
      <br />
      Whitelist : { user.whitelistStatus ? "Oui" : "Non" }
      <br />
      Staff : { user.adminLvl > 0 ? "Oui" : "Non" }
      <br />
      Steam : { user.steam ? user.steam : "Non renseiné" }
      <br />
      FiveM : { user.fivem ? user.fivem : "Non renseiné" }
      <br />
      Dernière connexion : { user.lastco ? user.lastco : "Jamais" }
      <br />
      Date d'inscription : { new Date(user.registryDate).toLocaleDateString("fr") }
    </div>
  )
}

export default Informations