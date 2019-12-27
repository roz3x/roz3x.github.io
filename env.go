/* writter @roz3x */
/* github  @roz3x */
/* my name @roz3x */
package main

import (
    "io/ioutil"
    "log"
   // "os"
    "net/http"
    "fmt"
)

func handler ( w http.ResponseWriter, r *http.Request) {
        file_name  := string([]byte(r.URL.String()[1:]))
        fmt.Printf("requested file :%v\n" ,file_name)
        file , err := ioutil.ReadFile("./"+file_name)
        if err != nil {
                fmt.Printf(err.Error())
        }
        if file_name == "index.css" {
            w.Header().Set("Content-Type" , "text/css")
        }
        fmt.Fprintf( w ,"%v", string(file))
}

func main() {
        http.HandleFunc("/",handler)
        log.Fatal(http.ListenAndServe(":8080",nil))
        return
}
