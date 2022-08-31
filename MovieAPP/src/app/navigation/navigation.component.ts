import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetUser, Photo, User } from '../_models/user';
import { UserManagementServiceService } from '../_services/user-management-service.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  animations: [
    trigger('hamburguerX', [
      state('hamburguer', style({})),
      state(
        'topX',
        style({
          transform: 'rotate(45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      state(
        'bottomX',
        style({
          transform: 'rotate(-45deg) translateY(8px) translateX(-6.5px)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      transition('* => *', [
        animate('0.3s'),
      ]),
    ]),
  ],
})
export class NavigationComponent implements OnInit {
  model: any = {};
  user: GetUser;
  showMenu: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  ngOnInit(): void {
    this.loadLoggedInUser();

  }

  constructor(private umService: UserManagementServiceService, private breakpointObserver: BreakpointObserver, public accountService: AccountService, private router: Router, private toastr: ToastrService) { }
  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/home');
      window.location.reload();
    }, error => {
      console.log(error);
      this.toastr.error("Neispravno korisnicko ime ili lozinka");
    })
  }
  toggle() {
    this.showMenu = !this.showMenu;
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
    window.setTimeout(function () { location.reload() }, 500)
  }
  loadLoggedInUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const id = this.accountService.getId(user);
    if (user) {
      this.umService.getMember(id).subscribe(user1 => {
        this.user = user1;
      })
    }
  }
  isHamburguer = false;
  onClick() {
    this.isHamburguer = !this.isHamburguer;
  }
}
