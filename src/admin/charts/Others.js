import React, {Component} from 'react';
import {v1} from "uuid";

class Others extends Component {
    render() {
        const {title, list, property} = this.props;

        return (
            <div className={"card shadow "}>
                <div className={"card-header"}>
                    <h4 className="card-header-title">{title}</h4>
                </div>
                <div className={"card-body p-0 scrollbar"}
                     style={{maxHeight: "415px", overflowY: "scroll"}}>
                    <div class="list-group">
                        {list && list.map(item => (
                            <span key={v1()} className="list-group-item list-group-item-action">
                                {item.response[property]}
                            </span>
                        ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Others;