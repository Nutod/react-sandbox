export interface IRepo {
   name: string
   owner: IOwner
   html_url: string
   stargazers_count: number
   forks: number
   open_issues: number
 }
 
 export interface IOwner {
   login: string
   avatar_url: string
 }