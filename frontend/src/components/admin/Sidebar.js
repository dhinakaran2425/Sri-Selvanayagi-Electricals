
import './sb.css';
export default function Sidebar () {

    return (
            <div className="sidebar1 close1">
      <ul className="nav-links">
        <li>
          <a href="/admin/dashboard"><i class="fa fa-tachometer"></i>
            Dashboard
          </a>
        </li><hr/>
        <li className="active">
          <div className="iocn-link">
            <a href="/admin/dashboard"><i class="fa fa-list-alt"></i>
              Products
            </a>
          </div>
          <ul className="sub-menu">
            <li><a href="/admin/products"><i class="fa fa-product-hunt"></i>All</a></li>
            <li><a href="/admin/products/create"><i class="fa fa-plus-circle"></i>Create</a></li>
          </ul>
        </li>
        <hr/>
        <li>
          <a href="/admin/orders"><i class="fa fa-shopping-cart"></i>
            Orders
          </a>
        </li><hr/>
        <li>
          <a href="/admin/users"><i class="fa fa-users"></i>
            Users
          </a>
        </li><hr/>
        <li>
          <a href="/admin/reviews"><i class="fa fa-star-o"></i>
            Review
          </a>
        </li><hr/>
      </ul>
    </div>
    )
}