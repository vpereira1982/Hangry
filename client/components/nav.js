const React = require('react');

const Nav = () => (<header>
  <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-indigo">
    <div className="container">
      <a className="navbar-brand" href="">
        <strong>Hangry Home</strong>
      </a>
      <ul className="nav navbar-nav navbar-right" id="login">
        <li className="dropdown">
          <a href="http://phpoll.com/register" className="dropdown-toggle" data-toggle="dropdown">Register
            <span className="caret"></span>
          </a>
          <ul className="dropdown-menu dropdown-lr animated flipInX" role="menu">
            <div className="col-lg-12">
              <div className="text-center">
                <h3>
                  <b>Register</b>
                </h3>
              </div>
              <form id="ajax-register-form" action="http://phpoll.com/register/process" method="post" role="form" autoComplete="off">
                <div className="form-group">
                  <input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" value=""/>
                </div>
                <div className="form-group">
                  <input type="email" name="email" id="email" tabIndex="1" className="form-control" placeholder="Email Address" value=""/>
                </div>
                <div className="form-group">
                  <input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password"/></div>
                <div className="form-group">
                  <input type="password" name="confirm-password" id="confirm-password" tabIndex="2" className="form-control" placeholder="Confirm Password"/></div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-xs-6 col-xs-offset-3">
                      <input type="submit" name="register-submit" id="register-submit" tabIndex="4" className="form-control btn btn-primary" value="Register Now"/></div>
                  </div>
                </div>
                <input type="hidden" className="hide" name="token" id="token" value="7c6f19960d63f53fcd05c3e0cbc434c0"/></form>
            </div>
          </ul>
        </li>
        <li className="dropdown" id="left-dropdown">
          <a href="http://phpoll.com/login" className="dropdown-toggle" data-toggle="dropdown">Log In
            <span className="caret"></span>
          </a>
          <ul className="dropdown-menu dropdown-lr animated slideInRight" role="menu">
            <div className="col-lg-12">
              <div className="text-center">
                <h3>
                  <b>Log In</b>
                </h3>
              </div>
              <form id="ajax-login-form" action="http://phpoll.com/login/process" method="post" role="form" autoComplete="off">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" value="" autoComplete="off"/></div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" autoComplete="off"/></div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-xs-7">
                      <input type="checkbox" tabIndex="3" name="remember" id="remember"/>
                      <label htmlFor="remember">
                        Remember Me</label>
                    </div>
                    <div className="col-xs-5 pull-right">
                      <input type="submit" name="login-submit" id="login-submit" tabIndex="4" className="form-control btn btn-primary" value="Log In"/></div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="text-center">
                        <a href="http://phpoll.com/recover" tabIndex="5" className="forgot-password">Forgot Password?</a>
                      </div>
                    </div>
                  </div>
                </div>
                <input type="hidden" className="hide" name="token" id="token" value="a465a2791ae0bae853cf4bf485dbe1b6"/></form>
            </div>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</header>);

module.exports = Nav;
