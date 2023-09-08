import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  userSubject$ = new Subject<any>();

  constructor(
    private authFire: AngularFireAuth,
    public router: Router,
    public firestore: AngularFirestore,
    private toastr: ToastrService
  ) {
    this.authFire.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.userSubject$.next(this.userData); //progamacion reactiva
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        this.userSubject$.next(null);
        localStorage.removeItem('user');
      }
    });
  }

  login(email: string, password: string){
    return this.authFire
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.toastr.info(
          'Se ha iniciado sesión!',
          'Información'
        );
        this.router.navigate(['person-list']);
      })
      .catch((error) => {this.toastr.error(this.firebaseError(error.code),'Error')});
  }

  registerPerson(email: string, password: string, nombre: string) {
    return this.authFire
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.storeUserData(result.user, nombre);
        this.router.navigate(['/login'])
      })
      .catch((error) => {this.toastr.error(this.firebaseError(error.code),'Error')});
  }

  isLoggedIn():boolean {
    const user = JSON.parse(localStorage.getItem("user")!);
    return  (user !== null) ? true: false;
  }

  logOut( ){
    this.authFire.signOut().then(() =>{
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }

  storeUserData(user: any, nombre: string) {
    this.firestore
      .collection('user')
      .doc(user.uid)
      .set({
        uid: user.uid,
        correo: user.email,
        nombre: nombre,
        descripcion: '',
        foto: '',
        valoraion: 0,
        experiencia: [],
        habilidades: [],
      })
      .then((result) => {
        this.toastr.success(
          'La cuenta fue registrada existosamente!',
          'Usuario Registrado'
        );
      });
  }

  firebaseError(code: string) {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El correo está siendo usado';
      case 'auth/weak-password':
        return 'La contraseña es muy debil';
      case 'auth/invalid-email':
        return 'El correo es invalido';
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta';
      case 'auth/user-not-found':
          return 'El usuario no existe';
      default:
        return 'Error desconocido';
    }
  }
}
