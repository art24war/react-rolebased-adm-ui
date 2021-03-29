import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import UserService  from "../services/user.service";
import { useContextMenu } from 'react-contexify';
import UsersContextMenu  from '../components/UsersContextMenu';
import {promiseState}  from '../helpers/promiseState'

const hasNoUsers = ()=> {
  return ("No users available");
}
const MENU_ID = "menu-id";
const columns = [{
  dataField: 'id',
  text: 'User ID'
}, {
  dataField: 'login',
  text: 'Login'
}, {
  dataField: 'userType',
  text: 'User Type'
}];

const UsersTable = (props) => {
  const remote={
    filter: false,
    pagination: false,
    sort: false,
    cellEdit: false
  };
  
  const[users, setUsers] = useState([]);
  const[currentRequest, setRequest] = useState(null)
  const[refresh, setRefresh] = useState(props.refresh);
  
  const reloadTable = () => {
      if(currentRequest != null && promiseState(currentRequest) == 'pending')
      {
        currentRequest.constructor.reject();
        setRequest(null);
      }
      let request  = UserService.getAllUsersList();
      setRequest(request);
      request.then(function(response){
        setUsers(response.data);
        return Promise.resolve(response.data);
      });
    }
  
  const onTableChange = (type, newState) => {
    reloadTable();
  };

  useEffect(() => {
    return reloadTable();
  }, [props.refresh]);

  //use context menu on rows
  const { show } = useContextMenu({
    id: MENU_ID
  });

  function displayMenu(e, props){
    // put whatever custom logic you need
    // you can even decide to not display the Menu
    show(e, props);
  }

  const rowEvents = {
    onContextMenu : (e, row, rowIndex) =>  displayMenu (e, { props: { elementId: row.id }})
  }

  return (
    <div>
      <UsersContextMenu menu_id={MENU_ID}/>
      <BootstrapTable bootstrap4 
          classes = 'users-table'
          striped hover
          keyField='id' remote= { remote } data={ users } columns={ columns } filter={ filterFactory() } 
          noDataIndication = { hasNoUsers() } 
          filterPosition = "top" 
          rowEvents={ rowEvents }/>
    </div>
  )
};
export default UsersTable;
