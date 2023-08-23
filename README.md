# Applicator Seminar
Share knowledge  

## Branch
- main : website branch  
- page : deploy branch, github page will show this branch  
- data : data branch, seminar data store in this branch  

# How to contribute
First, need to fork this repository  
  
And, clone your repo to local storage  
```powershell
git clone <YOUR REPO>
```

See remote branch list  
```powershell
git branch -r
```

Checkout remote branch  
```powershell
git checkout -t origin/<BRANCH NAME>
```

## Deploy
Use [auto_deploy.ps1](./auto_deploy.ps1) in window system  
```powershell
./auto_deploy.ps1
```
  
> WARNING  
> must commit all your changes and run this command
> or, maybe conflict happened

## Credit
- [@4ch1o3](https://github.com/4ch1o3): Top topic, math topic image  

## TODO
- [ ] Refac all page, style