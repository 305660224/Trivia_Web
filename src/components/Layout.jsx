import PropTypes from 'prop-types';
import './Layout.css';


const Layout = ({ children }) => {
  return (
    <div className="layout">
      <main className="layout-main">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;