/* @summary Controller to manage behavior of add/remove IP
 * @author Gaurav Prabhu <gauravprabhu77@gmail.com>
 *
 * Created at     : 2019-08-05,
 * Last modified  : 2019-08-08
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-ip-manager',
  templateUrl: './ip-manager.component.html',
  styleUrls: ['./ip-manager.component.scss']
})

export class IpManagerComponent implements OnInit {
  registerForm: FormGroup;
  ipform: FormGroup;
  productForm: FormGroup;
  currenttype;
  ipaddr;
  currentplan;
  ipCollection;
  getTypeFromStorage;
  invaliderrormsg = 'Please enter a valid IP address';

  constructor(private formBuilder: FormBuilder) { }

  // Handle Add button permission based on user Plan
  enableAddbtn() {
    const ipCollectionlen = this.ipCollection.length;
    if (this.currenttype != null) {
        if (this.currenttype === 'Premium') {
          if (ipCollectionlen >= 10) {
            return true;
          } else {
            return false;
          }
        } else {
          if (ipCollectionlen >= 5) {
            return true;
          } else {
            return false;
          }
        }
    }
  }

  ngOnInit() {
   this.formInit();
   this.ipformInit();
   this.updateExistingIp();
   this.getTypeFromStorage = localStorage.getItem('usertype');
   if (this.getTypeFromStorage != null) {
    this.currenttype = this.getTypeFromStorage;
   }
}

// Populate UI elements if already present in localstorage
updateExistingIp() {
  if (localStorage.getItem('ipCollection') !== null) {
    const data = JSON.parse(localStorage.getItem('ipCollection'));
    this.ipCollection = data;
  }
}

// To initialise and reset user plan 
 formInit() {
    this.registerForm = this.formBuilder.group({
      type: ['', Validators.required]
  });
 }

 // To initialise and reset IP address
ipformInit() {
  this.ipCollection = [{
    ip : '',
    valid: true
  }];
}

 // Saves User Plan
 onSave() {
  // stop here or add alert message if form is invalid
  if (this.registerForm.invalid) {
      return;
  }

  if ( this.registerForm.value.type != null ) {
      this.currenttype = this.registerForm.value.type;
      localStorage.setItem('usertype', this.registerForm.value.type);
      this.formInit();
      this.ipformInit();
  }
}

  // Saves IP address collection
  onSaveIPCollection() {
    const ipCollectionStr = JSON.stringify(this.ipCollection);
    localStorage.setItem('ipCollection', ipCollectionStr );
    Swal.fire(
      'Success!',
      'Current state has been saved',
      'success'
    );
  }

  // Reset a user Plan
  removeplan(): void {
    localStorage.clear();
    this.currenttype = null;
    this.ipformInit();
  }

  // Clear IP collection from UI and storage
  clearIPcollection(): void {
    localStorage.removeItem('ipCollection');
    this.ipformInit();
  }

  // IP address validator
  isValidIP(item) {
      const ip = item.ip;
      if (ip) {
        const octet = '(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)';
        const regex = new RegExp(`^${octet}\\.${octet}\\.${octet}\\.${octet}$`);
        item.valid = regex.test(ip);
        return regex.test(ip);
      } else {
        item.valid = true;
        return true;
      }
  }

  // Save the IP collection if no validation error
   isSaveValid() {
    const errfiltered = this.ipCollection.filter( v => v.valid === false );
    const atleastoneIP = this.ipCollection.filter( v => v.ip !== '' );

    if (errfiltered.length === 0 && atleastoneIP.length > 0) {
      return false;
    } else {
      return true;
    }
   }

  // Insert a new UI element to add IP address
  addIpAddr(val) {
    this.ipCollection.push({ip: '', valid: true});
  }

  // Remove selected UI text box and clear input box if its the last element
  deleteIpaddr(index) {
    if (this.ipCollection.length === 1) {
      this.ipformInit();
    } else {
      this.ipCollection.splice(index, 1);
    }

  }

}
