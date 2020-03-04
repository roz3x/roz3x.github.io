package main

import (
	"fmt"
	"math"
	"math/rand"
	"syscall/js"
	"time"

	"github.com/lucasb-eyer/go-colorful"
)

func add(_ js.Value, i []js.Value) interface{} {
	println(js.ValueOf(i[0].Int() - i[1].Int()).String())
	return nil
}

func eval(_ js.Value, _ []js.Value) interface{} {
	println(js.Global().Get("document").Get("body").Get("clientHeight").String())
	return nil
}

func registerCallbacks() {
	js.Global().Set("add", js.FuncOf(add))
	js.Global().Set("eval", js.FuncOf(eval))
}

func main() {
	registerCallbacks()
	fmt.Println("Go Wasm initialized")
	doc := js.Global().Get("document")
	canvas := doc.Call("getElementById", "canvas")
	body := doc.Get("body")

	bodyWidth := body.Get("clientWidth").Float()
	bodyHeight := body.Get("clientHeight").Float()
	canvas.Set("width", bodyWidth)
	canvas.Set("height", bodyHeight)
	mousePos := []float64{bodyWidth / 2, bodyHeight / 2}

	ctx := canvas.Call("getContext", "2d")
	done := make(chan struct{}, 0)
	colorRot := float64(0)
	curPos := []float64{bodyWidth / 2, bodyHeight / 2}
	// mouseMovEvt := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
	// 	e := args[0]
	// 	mousePos[0] = e.Get("clientX").Float()
	// 	mousePos[1] = e.Get("clientY").Float()
	// 	return nil
	// })
	// defer mouseMovEvt.Release()

	// doc.Call("addEventListener", "mousemove", mouseMovEvt)
	go func() {
		for {
			time.Sleep(time.Second * 2)
			mousePos[0] = float64(rand.Intn(int(bodyWidth)))
			mousePos[1] = float64(rand.Intn(int(bodyHeight)))
		}
	}()
	var renderFrame js.Func
	renderFrame = js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		//handler for window resizing
		curBodyW := body.Get("clientWidth").Float()
		curBodyH := body.Get("clientHeight").Float()
		if curBodyH != bodyHeight || curBodyW != bodyWidth {
			bodyWidth, bodyHeight = curBodyW, curBodyH
			canvas.Set("width", bodyWidth)
			canvas.Set("height", bodyHeight)
		}
		curPos[0] += (mousePos[0] - curPos[0]) * 0.02
		curPos[1] += (mousePos[1] - curPos[1]) * 0.02

		colorRot = float64(int(colorRot+1) % 360)
		ctx.Set("fillStyle", colorful.Hsv(colorRot, 1, 1).Hex())
		ctx.Call("beginPath")
		ctx.Call("arc", curPos[0], curPos[1], 80, 0, 2*math.Pi)
		ctx.Call("fill")
		js.Global().Call("requestAnimationFrame", renderFrame)
		return nil
	})
	defer renderFrame.Release()
	js.Global().Call("requestAnimationFrame", renderFrame)
	<-done
}
