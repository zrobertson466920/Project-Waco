
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

abi_array = [{"constant":true,"inputs":[],"name":"client","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"issuer","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"id_hash","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"new_client","type":"address"}],"name":"Swap_Client","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"is_client","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"is_issuer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"new_id_hash","type":"string"}],"name":"Update_ID","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"new_id_hash","type":"string"}],"payable":false,"type":"constructor"}];

//address = '0x813774f3b6bbc82012fe5b4b268e8755981e6d6e';
//This is the address of the smart contract we are using


Template.body.helpers({

	'clicked': function(){

		return Session.get('clicked');

	}

});


Template.hello.helpers({


	'receive_code': function(){

		const r_template = Template.instance();
		var addr_pntr = ReactiveVar(null);

		//Upload QR code (Hash of contract address) to IPFS and receive address pointer
		ipfs.cat(Session.get('code'), function(err,res){

			if(res != null){
				TemplateVar.set(r_template, "addr_pntr", res.toString());
				console.log('got addr_pntr', res.toString());
			}

		});

	},


	'send_code': function(){

		const s_template = Template.instance();
		var id_hash = ReactiveVar(null);
		var id  = ReactiveVar(null);

		client_contract = web3.eth.contract(abi_array).at(TemplateVar.get("addr_pntr"));

		//Once we have access to the contract we can receive a id_hash 
		client_contract.id_hash(function(err,res){

                        if(res != null){
				TemplateVar.set(s_template, "id_hash", res.toString());
				console.log('got id_hash', res.toString());
			}
      
		});

		//Subsequently, we can look up the hash using IPFS and receive the contents
		ipfs.cat(TemplateVar.get("id_hash"), function(err, res){

			if(res != null){
				TemplateVar.set(s_template, "id", res.toString());
				console.log('got id', res.toString());
			}

		});

	},

});

Template.scanning.helpers({
  
	'check': function(){

		Session.set('code', qrScanner.message());

		if (Session.get('code') != null) {

			console.log(Session.get('code'));
			Session.set('clicked', false);

                        return true;

		}

		else{

			return false;

		}

	},


});


Template.hello.events({
      
	'click button': function(){
  
		Session.set('clicked', true);
		console.log("on");

	}

});


Template.scanning.events({

	'click button': function(){
  
		Session.set('clicked', false);
		Session.set('code', qrScanner.message());
		console.log("off");

	}

});
