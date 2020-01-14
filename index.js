/* 
  good to see you here .. 
  i am pretty bad at js 
  follow https://developers.spotify.com
  for in-deapth details
  well code is pretty much sterile at 
  this time so , writing it from the beginning
  would be easiler  */
var dat = {
    "message": "dont worry , its fine",
    "committer": {
        "name": "roz3x",
        "email": "oroz3x@gmail.com"
    },
    "content": `{
        "tracks": {
          "items" : []
        }
      }`,
} 
var dat_del = {
    "message": "dont worry , its fine",
    "committer": {
        "name": "roz3x",
        "email": "oroz3x@gmail.com"
    },
    "sha": ""
}
let code = "ZGZhYWYxZTAwMzRkNDE4YjhkMDFmNThhNGNlNDZmY2Q6OWRhZmZhOWMzNmQ3NGJmNDk2YzVlYmQxMTk1ODYwODg="
let token = 0;
let preview_tracks = []
let preview_song_names = []
let idx = {}
let xdi = {}
let now_playing = 0
let _data = {}
let fate = 0
let last_active_text = null
let last_active_image = null
let absolute = 0
let playing = 0
/*
    oops
*/
let token_2 =  "cm96M3hkYnNwb3RpZnk6YjZmODMxZjk4NmNjMWE4OGFkOGM3YmZiNThhZDA0NjkwYTQ5ZjI5Nw=="


// Authorization: "Basic cm96M3hkYnNwb3RpZnk6YjZmODMxZjk4NmNjMWE4OGFkOGM3YmZiNThhZDA0NjkwYTQ5ZjI5Nw=="
let saved_items = {
    "tracks": {
        "items": []
    }
}
let selected = 0

window.onload = () => {
 
    if (!(/chrome|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        var child = document.body.lastElementChild;
        while (child) {
            document.body.removeChild(child);

            child = document.body.lastElementChild;
        }
        document.body.innerHTML = "sorry ! not for computers"
    }
    document.getElementById("clear_cookie").onclick = () => {
        console.log(document.cookie)
        document.cookie = ";"
        saved_items = {}
        window.location.reload()
    }
    if (document.cookie == "") {
        //checking for the latest commit 
        //assinging that to document.cookie 
        //then make the file so that no body else has the same commit value
        fetch("https://api.github.com/repos/roz3xdbspotify/db/commits")
            .then(data => data.json())
            .then(txt => {
                document.cookie = txt[0].sha
                console.log(document.cookie)
                dat.content = btoa(dat.content)
                fetch(`https://api.github.com/repos/roz3xdbspotify/db/contents/` + txt[0].sha, {
                    body: JSON.stringify(dat),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Authorization": "Basic " + token_2
                    },
                    method: "PUT"
                }).then(data => data.json())
                    .then(data => {
                        console.log(data)
                    })

                fetch("https://api.github.com/repos/roz3xdbspotify/db/contents/" + document.cookie, {
                    body: JSON.stringify(dat),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "Basic " + token_2
                    },
                    method: "PUT"
                }).then(data => {
                    console.log(data)
                })

            })
    } else {
        //getting the file according to document.cookie
        //adding this to the playlist data

        fetch(`https://raw.githubusercontent.com/roz3xdbspotify/db/master/` + document.cookie)
            .then(data => data.json())
            .then(lol => {
                console.log(lol)
                saved_items = lol
            })

    }
    document.getElementById("save").onclick = () => {



        //add the sond stuff to the saved items thingy 
        //delete the file rewrite the things to it and then make 
        saved_items.tracks.items.push(_data.tracks.items[selected])

        console.log(saved_items)

        fetch("https://api.github.com/repos/roz3xdbspotify/db/contents/" + document.cookie)
            .then(data => data.json())
            .then(txt => {
                console.log(txt.sha)
                dat_del.sha = txt.sha
                fetch("https://api.github.com/repos/roz3xdbspotify/db/contents/" + document.cookie, {
                    body: JSON.stringify(dat_del),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        // 'Accept': 'application/json',
                        "Authorization": "Basic " + token_2
                    },
                    method: "DELETE"
                }).then(del_text => {
                    console.log(del_text)
                }).catch(function (err) {
                    console.log('Fetch Error :-S', err);
                })
                .then(() => {
                    console.log("hell")
                    dat.content = btoa(JSON.stringify(saved_items))
                fetch("https://api.github.com/repos/roz3xdbspotify/db/contents/" + document.cookie, {
                    body: JSON.stringify(dat),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "Basic " + token_2
                    },
                    method: "PUT"
                }).then(data => {
                    console.log(data)
                    document.getElementById("save").style.display = "none"
                })
               

            })
        })

    }
    document.getElementById("to_play").onclick = () => {
        now_playing = 0

        document.getElementById("play_button").style.display = "none"
        fetch(`https://api.github.com/repos/roz3xdbspotify/db/contents` + document.cookie, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + token_2
            },
            method: "GET",
            cache: "no-cache"
        })
            .then(data => data.json())
            .then(t_data => {
                console.log(document.cookie)
                console.log(t_data)
                let data = JSON.parse(atob(t_data.content))
                console.log(data)
                console.log(data.tracks)
                _data = data
                var child = results_1.lastElementChild;
                while (child) {
                    results_1.removeChild(child);
                    child = results_1.lastElementChild;
                }

                child = results_2.lastElementChild;
                while (child) {
                    results_2.removeChild(child);
                    child = results_2.lastElementChild;
                }


                child = results_3.lastElementChild;
                while (child) {
                    results_3.removeChild(child);
                    child = results_3.lastElementChild;
                }

                let len = data.tracks.items.length
                console.log(len)
                preview_tracks = []
                preview_song_names = []
                for (i = 0; i < len; i++) {
                    let song = document.createElement("div")
                    song.className = "_song"
                    song.id = "song_id_" + i.toString()
                    let content = `<div class="name" id="song_name_`
                        + i.toString()
                        + `">`
                        + data.tracks.items[i].name
                        + `</div>`
                        + `<div id="image_container">`
                        + `<img id="song_image_` + i.toString()
                        + `" class="image" src="` + data.tracks.items[i].album.images[0].url
                        + `" width="80%" height="80%">`
                    let preview_url = data.tracks.items[i].preview_url
                    if (preview_url != null) {
                        //indexing the wholing thing , might help later
                        idx[preview_tracks.length] = i
                        xdi[i] = preview_tracks.length
                        preview_tracks.push(preview_url)
                        preview_song_names.push(data.tracks.items[i].name)
                        content += `<img id="pl_id_`
                            + (preview_tracks.length - 1).toString()
                            + `" src="./play.png" width="30%" height="35%" class="play_image">`
                    }
                    song.innerHTML = content + `</div>`

                    if (i % 3 == 0) {
                        results_1.appendChild(song)
                    } else if (i % 3 == 1) {
                        results_2.appendChild(song)
                    } else {
                        results_3.appendChild(song)
                    }
                }
                // var pl = []
                // for ( j = 0 ; j < preview_tracks.length ; j++  ){
                //     pl.push(document.getElementById("pl_id_"+j.toString()))
                // }
                // for ( let k = 0   ; k < preview_tracks.length ; k++  ){
                //     pl[k].addEventListener("click",()=>{
                //         play_preview(k)
                //         now_playing = k+1
                //     }) 

                // }
                let _song_event = (i) => {
                    play_preview(i)
                }
                for (let k = 0; k < len; k++) {
                    document.getElementById("song_id_" + k.toString()).onclick = () => {
                        document.getElementById("info").style.display = "block"
                        document.getElementById("save").style.display = "none"
                        // if (_data.tracks.items[k].preview_url != null){
                        //     let play_btn = document.getElementById("play_button")
                        //     now_playing = len++
                        //     play_btn.style.display = "block"
                        // } 
                        selected = k
                        if (_data.tracks.items[k].preview_url != null) {
                            document.getElementById("play_button").style.display = "block"
                            absolute = xdi[k]
                        } else {
                            document.getElementById("play_button").style.display = "none"
                        }
                        document.getElementById("info_text").style.fontSize = ".7em"
                        document.getElementById("info_text").innerHTML = _data.tracks.items[k].name
                        document.getElementById("artist_name").innerHTML = `by: ` + (data.tracks.items[k].artists[0].name).toString()
                        document.getElementById("artist_name").style.fontSize = ".7em"
                        document.getElementById("info_text").style.background = "#fff"
                        document.getElementById("info").style.background = `url("` + data.tracks.items[k].album.images[0].url + `")`
                    }
                }
            })


    }
    document.getElementById("slider").onclick = () => {
        if (playing) {
            document.getElementById("audio_player").pause()
            playing = 0
        } else {
            document.getElementById("audio_player").play()
            playing = 1
        }
    }
    document.getElementById("close").onclick = () => {
        document.getElementById("info").style.display = "none"
    }
    document.getElementById("inner_play").onclick = () => {
        now_playing = absolute
        play_preview(absolute)
    }
    document.getElementById("next").onclick = () => {
        fate = 0
        play_preview(now_playing)
    }
    document.getElementById("prev").onclick = () => {
        fate = 1
        now_playing -= 2
        play_preview(now_playing)
    }
    get_token()
    let search = () => {
        get_track(input.value)
    }
    let results_1 = document.getElementById("results_1")
    let results_2 = document.getElementById("results_2")
    let results_3 = document.getElementById("results_3")
    let input = document.getElementById("input")
    let get_track = (data) => {
        now_playing = 0
        document.getElementById("play_button").style.display = "none"
        fetch("https://api.spotify.com/v1/search?q=" + data + "&type=track", {
            headers: {
                Authorization: "Bearer " + token,
            }
        }).then(data => data.json())
            .then(data => {
                _data = data
                console.log(data)
                var child = results_1.lastElementChild;
                while (child) {
                    results_1.removeChild(child);
                    child = results_1.lastElementChild;
                }

                child = results_2.lastElementChild;
                while (child) {
                    results_2.removeChild(child);
                    child = results_2.lastElementChild;
                }


                child = results_3.lastElementChild;
                while (child) {
                    results_3.removeChild(child);
                    child = results_3.lastElementChild;
                }

                let len = data.tracks.items.length
                preview_tracks = []
                preview_song_names = []
                for (i = 0; i < len; i++) {
                    let song = document.createElement("div")
                    song.className = "_song"
                    song.id = "song_id_" + i.toString()
                    let content = `<div class="name" id="song_name_`
                        + i.toString()
                        + `">`
                        + data.tracks.items[i].name
                        + `</div>`
                        + `<div id="image_container">`
                        + `<img id="song_image_` + i.toString()
                        + `" class="image" src="` + data.tracks.items[i].album.images[0].url
                        + `" width="80%" height="80%">`
                    let preview_url = data.tracks.items[i].preview_url
                    if (preview_url != null) {
                        //indexing the wholing thing , might help later
                        idx[preview_tracks.length] = i
                        xdi[i] = preview_tracks.length
                        preview_tracks.push(preview_url)
                        preview_song_names.push(data.tracks.items[i].name)
                        content += `<img id="pl_id_`
                            + (preview_tracks.length - 1).toString()
                            + `" src="./play.png" width="30%" height="35%" class="play_image">`
                    }
                    song.innerHTML = content + `</div>`

                    if (i % 3 == 0) {
                        results_1.appendChild(song)
                    } else if (i % 3 == 1) {
                        results_2.appendChild(song)
                    } else {
                        results_3.appendChild(song)
                    }
                }
                // var pl = []
                // for ( j = 0 ; j < preview_tracks.length ; j++  ){
                //     pl.push(document.getElementById("pl_id_"+j.toString()))
                // }
                // for ( let k = 0   ; k < preview_tracks.length ; k++  ){
                //     pl[k].addEventListener("click",()=>{
                //         play_preview(k)
                //         now_playing = k+1
                //     }) 

                // }
                let _song_event = (i) => {
                    play_preview(i)
                }
                for (let k = 0, len = 0; k < _data.tracks.items.length; k++) {
                    document.getElementById("song_id_" + k.toString()).onclick = () => {
                        document.getElementById("info").style.display = "block"
                        document.getElementById("save").style.display = "inline"
                        // if (_data.tracks.items[k].preview_url != null){
                        //     let play_btn = document.getElementById("play_button")
                        //     now_playing = len++
                        //     play_btn.style.display = "block"
                        // } 
                        selected = k
                        if (_data.tracks.items[k].preview_url != null) {
                            document.getElementById("play_button").style.display = "block"
                            absolute = xdi[k]
                        } else {
                            document.getElementById("play_button").style.display = "none"
                        }
                        document.getElementById("info_text").style.fontSize = ".7em"
                        document.getElementById("info_text").innerHTML = _data.tracks.items[k].name
                        document.getElementById("artist_name").innerHTML = `by: ` + (data.tracks.items[k].artists[0].name).toString()
                        document.getElementById("artist_name").style.fontSize = ".7em"
                        document.getElementById("info_text").style.background = "#fff"
                        document.getElementById("info").style.background = `url("` + data.tracks.items[k].album.images[0].url + `")`
                    }
                }
            })
    }
    window, onkeydown = (ev) => {
        if (ev.keyCode == 13) {
            get_track(input.value)
        }
    }
    let search_button = document.getElementById("search").onclick = search
}

let play_preview = (src) => {
    now_playing = (((now_playing+1)%preview_song_names.length)+preview_song_names.length ) %preview_song_names.length
    if (src < 0 || src > preview_song_names.length - 1) { src = 0 }
    if (last_active_image != null) {
        last_active_text.style.color = "#FFF"
        last_active_image.style.filter = "grayscale(100%) blur(2px)"
        last_active_image.style.transform = "scale(1) rotate(-7deg)"
        last_active_text.style.transform = "scale(1) rotate(0deg)"


    }
    last_active_text = document.getElementById("song_name_" + idx[src].toString())
    last_active_image = document.getElementById("song_image_" + (idx[src]).toString())

    let audioplayer = document.getElementById("audio_player")
    document.title = "duh : " + preview_song_names[src]

    last_active_image.style.filter = "grayscale(0%) blur(0px)"
    last_active_text.style.color = "#00ff7f"
    last_active_text.style.transform = "scale(1.2) rotate(3deg)"
    last_active_image.style.transform = "scale(1.1) rotate(3deg)"

    playing = 1

    audioplayer.src = preview_tracks[src]
    audioplayer.play()
    document.getElementById("marq").innerHTML = "duh : " + preview_song_names[src]
    audioplayer.onabort = () => {
        if (fate == 0) {
            document.getElementById("song_name_" + idx[src-1].toString()).style.color = "#FFF"
            document.getElementById("song_image_" + idx[src-1].toString()).style.filter  = "grayscale(100%) blur(2px)"
        } else {
            document.getElementById("song_name_" + idx[src+1].toString()).style.color = "#FFF"
            document.getElementById("song_image_" + idx[src+1].toString()).style.filter  = "grayscale(100%) blur(2px)"

        }
    }
    audioplayer.onended = () => {
        document.getElementById("song_name_" + idx[src].toString()).style.color = "#FFF"

        document.getElementById("song_image_" + idx[src].toString()).style.filter = "grayscale(100%) blur(2px)"
        play_preview(src + 1)
    }
    audioplayer.ontimeupdate = () => {
        document.getElementById("pointer").style.marginLeft = ((audioplayer.currentTime / audioplayer.duration * 85) + 1).toString() + "%"
        document.getElementById("pointer").innerHTML = Math.round(audioplayer.currentTime / audioplayer.duration * 100).toString() + "% <div>🐙</div>"
    }
}

let get_token = () => {
    fetch("https://accounts.spotify.com/api/token", {
        body: "grant_type=client_credentials",
        headers: {
            Authorization: "Basic " + code,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    })
        .then(data => data.json())
        .then(data => {
            token = data.access_token
        })
}
