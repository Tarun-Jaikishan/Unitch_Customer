import { ListGroupItem, ListGroup } from "react-bootstrap";
import { ChatLeftText, ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const TicketDetails = (props) => (
  <div className="card">
    <div className="px-5 py-4">
      <div className="text-lg d-flex justify-content-between align-items-center ">
        <strong className="d-flex align-items-center flex-gap">
          <Link
            to="/myaccount"
            type="button"
            className="btn bg-purple text-white rounded-lg text-lg btn-sm"
          >
            <ArrowLeft />
          </Link>
          Ticket
        </strong>
        <strong className="px-2 py-1 bg-purple text-white rounded-lg">
          #{props.ticketno}
        </strong>
      </div>
      {/* <ChatLeftText
        className="float-right text-right ml-5"
        style={{ cursor: "pointer" }}
        onClick={() => props.display_ticket(props.id)}
      ></ChatLeftText> */}
    </div>
    <div className="px-5 pb-5">
      <table>
        <tr>
          <td>
            <strong>Opening Remark: </strong>
          </td>
          <td> {props.opening_remark}</td>
        </tr>
        <tr>
          {props.closing_remark && (
            <>
              <td>
                <strong>Closing Remark: </strong>
              </td>
              <td> {props.closing_remark}</td>
            </>
          )}
        </tr>
        <tr>
          <td>
            <strong>Status: </strong>
          </td>
          <td> {props.status_lbl}</td>
        </tr>
        <tr>
          <td>
            <strong>Category: </strong>
          </td>
          <td> {props.category_lbl}</td>
        </tr>
        <tr>
          <td>
            <strong>Sub Category: </strong>
          </td>

          <td> {props.subcategory_lbl}</td>
        </tr>
      </table>
    </div>
  </div>
);

export default TicketDetails;
