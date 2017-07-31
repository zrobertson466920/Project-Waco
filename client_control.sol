pragma solidity ^0.4.0;

contract Client {
    
    address public client;
    address public issuer;
    string public id_hash;
    
    modifier if_issuer(){ if(is_issuer(msg.sender)) _ ;}
    modifier if_client(){ if(is_client(msg.sender)) _ ;}
    
    function Client(string new_id_hash){
        
        issuer = msg.sender;
        client = msg.sender;
        id_hash = new_id_hash;
        
    }
    
    function is_issuer(address addr) public returns(bool){
        
        return addr == issuer;
        
    }
    
    function is_client(address addr) public returns(bool){
        
        return addr == client;
        
    }
    
    function Swap_Client (address new_client){
        
        client = new_client;
        
    }
    
    function Update_ID(string new_id_hash) if_issuer {
        
        id_hash = new_id_hash;
        
    }
    
}

