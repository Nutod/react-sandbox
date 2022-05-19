export interface IRepo {
   id: number
   name: string
   full_name: string
   owner: {
     login: string
     id: number
     avatar_url: string
     url: string
     html_url: string
     subscriptions_url: string
     repos_url: string
     events_url: string
     type: string
   }
   score: number
   url: string
   created_at: string
   updated_at: string
   stargazers_count: number
   watchers_count: number
   language: string
   open_issues_count: number
   forks: number
   open_issues: number
   watchers: number
 }