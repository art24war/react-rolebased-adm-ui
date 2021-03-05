import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
  
// create your menu first
const UsersContextMenu = (props) =>{ 
    const handleItemClick = ({ event, props, triggerEvent, data })=>
    {
      console.log(event, props, triggerEvent, data );
      alert(event.currentTarget.dataset.action + " an element " + props.elementId);
    }
    return (
        <Menu id={props.menu_id}>
            <Item data-action="edit" onClick={handleItemClick}>
                Edit
            </Item>
            <Item data-action="delete" onClick={handleItemClick}>
                Delete
            </Item>            
        </Menu>
    );
};

export default UsersContextMenu;