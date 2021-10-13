import React from 'react'
import "./Address.css"
import NewAddress from './NewAddress'

export default function Address( props) {
    
    const adddTodo = (event)=>{
        event.preventDefault();
        props.addTodo()
        props.setValue('')
        props.setValue2('')
    }

    return (
        <div>
            <div className="profile__add__contentBox">
                <div className="profile__add__block1">
                    <div className="profile__add__name">
                        <p>мои адреса</p>
                        <span className="profile__add__line"></span>
                    </div>
                 <NewAddress 
                    active2={props.active2} 
                    setActive2={props.setActive2} 
                    doneTodo={props.doneTodo}
                    deleteTodo={props.deleteTodo}
                    save={props.save}
                    data={props.data}
                 />
                </div>
                <div className="profile__add__block2">
                    <div className="profile__add__name2">
                        <p>добавить новый адрес</p>
                        <span className="profile__add__line2"></span>
                    </div>
                        <form onSubmit={adddTodo} className="profile__add__addBox">
                            <div className="profile__add__inp1">
                                <input onChange={(e)=> props.setValue(e.target.value)} value={props.value} className="profile__add__addInp1" type="text"/>
                                <p>название</p>
                            </div>
                            <div className="profile__add__inp2">
                                <input onChange={(e)=> props.setValue2(e.target.value)} value={props.value2} className="profile__add__addInp2" type="text"/>
                                <p>адрес</p>
                            </div>
                            <button className="profile__add__none"></button>
                        </form>                
                </div>
                
            </div>
        </div>
    )
}
