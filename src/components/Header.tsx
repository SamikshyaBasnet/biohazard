import '../styles/header.scss'

const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <div>
          <h1>Biological Hazard</h1>
        </div>
        <div className="user-info">
          <p className="username">sammy</p>
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
            alt="Random unsplash image"
            className="image"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
