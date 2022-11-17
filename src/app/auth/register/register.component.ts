import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  formReg: FormGroup;

  constructor(private usarioSerive: UsuarioService, private router: Router) { 
    this.formReg = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.usarioSerive.register(this.formReg.value)
      .then(response => console.log(response))
    .catch(error => console.log(error));
  }

  loginWithGoogle(){
    this.usarioSerive.loginWithGoogle()
    .then(response=>{
      this.router.navigate(['/dashboard']);
    })
    .catch(error=>console.log(error));
  }

}
