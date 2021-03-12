
const DisplayTicket = ({ ticket }) => {

    let repliedby = "";
    console.log("Display ticket", ticket);
    const reply = ticket.reply_lbl.map((r, index) => {

        if (!repliedby) {
            repliedby = r.repliedby;
        }

        const cssClass = repliedby !== r.repliedby ? "float-right text-right" : "float-left text-left";
        const marginPerc = (repliedby !== r.repliedby) ? "25%" : "0%";

        if (repliedby !== r.repliedby) {
            repliedby = r.repliedby;
        }
        return (<div key={index} className={`my-1 col-8 ${cssClass}`}
            style={{
                marginLeft: marginPerc
            }}
        >
            <div className="toast show">
                <div className="toast-body">
                    {r.description}
                </div>
                <div className="toast-header">
                    <strong className="mr-auto">{r.repliedby} </strong>
                    <small>{r.repliedon}</small>
                </div>
            </div>
        </div >);
    }
    );

    return (
        <div className="card row">
            <div className="card-header">
                <div className="card-title">
                    <strong>Ticket: #{ticket.ticketno}</strong>
                </div>
            </div>
            <div className="card-body">
                {reply}
            </div>
        </div>
    );
};

export default DisplayTicket;