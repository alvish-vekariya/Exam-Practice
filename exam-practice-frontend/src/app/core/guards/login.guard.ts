import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import { Location } from '@angular/common';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const ls = inject(LocalstorageService);


  if(ls.local && ls.token && ls.role){
    return true;
  }else{
    router.navigate(['/auth']);
    return false;
  }
};
