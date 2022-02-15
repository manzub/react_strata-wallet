import React from 'react';

function TransactionLog(props) {
    const { data, user } = props;

    return(<React.Fragment>
        <div className="col-12">
            <div className="box">
                <div className="box-body" style={{minHeight:300}}>
                    <h4 className="box-title">Activity Log</h4>
                    {data[0] ? <div className="table-responsive">
                        <table className="table mb-0">
                            <tbody>
                                {data.map(row=><TransactionRow user={user} key={row.hash} item={row} />)}
                            </tbody>
                        </table>
                    </div>: <div>No Transactions</div>}
                </div>
            </div>
        </div>
    </React.Fragment>)
}

const TransactionRow = (props) => {
    const { item, user } = props;
    let x = 'badge-';
    // eslint-disable-next-line eqeqeq
    const status = item.status == 'complete' ? x+'success' : x+'warning';
    // eslint-disable-next-line eqeqeq
    const type = item.from == user.address ? 'Transfered' : 'Recieved';
    // eslint-disable-next-line eqeqeq
    const type2 = item.from == user.address ? 'to' : 'from'
    return(<tr>
        <td>{type} {item.value} {type2} {item.to.substr(0,4)}...</td>
        <td><span className={"badge badge-pill "+status}>{item.status}</span></td>
    </tr>)
}

export default TransactionLog