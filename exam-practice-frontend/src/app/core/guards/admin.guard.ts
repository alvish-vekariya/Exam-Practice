import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import { Location } from '@angular/common';

export const adminGuard: CanActivateFn = (route, state) => {
  const ls = inject(LocalstorageService);
  const location = inject(Location);

  if(ls.local && ls.role === 'admin'){
    return true;
  }else{
    location.back();
    return false;
  }
};
