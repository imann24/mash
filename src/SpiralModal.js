import React, { useState, useEffect, useCallback } from "react";
import { Container, Button, Modal } from '@nextui-org/react';

const SpiralModal = ({ id, countCallback, buttonEnabled }) => {
    const [canvas, setCanvas] = useState(null);
    const [visible, setVisible] = useState(false);
    const [drawing, setDrawing] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [callbackFired, setCallbackFired] = useState(false);

    const showModal = () => setVisible(true);

    const setCanvasRef = useCallback(node => {
        if (node) {
            setCanvas(node);
            setDrawing(true);
            setStartTime(new Date());
        }
    }, []);

    const spaceFunction = useCallback((event) => {
        if (event.keyCode === 32 && !callbackFired) {
            setDrawing(false);
            const seconds = (new Date() - startTime) / 1000
            countCallback(Math.round((seconds - 0.75) / 1.5) + 1);
            setCallbackFired(true);
        }
    }, []);

    const draw = (canvas, context, time) => {
        if (drawing) {
            // only count time since the spiral started
            time = new Date() - startTime;
            context.clearRect(0, 0, canvas.width, canvas.height);
            const gap = 3;
            const steps = 60;
            const increment = 2 * Math.PI / steps;
            let theta = increment;
            context.strokeStyle = '#ffffff'
            context.lineWidth = 4;
            context.beginPath();
            context.moveTo(canvas.width / 2, canvas.height / 2);
            while (theta < (time / 1500) * Math.PI) {
                const x = canvas.width / 2 + theta * Math.cos(theta) * gap;
                const y = canvas.height / 2 + theta * Math.sin(theta) * gap;
                context.lineTo(x, y);
                theta += increment;
            }
            context.stroke();
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(canvas.width, canvas.height);
            context.stroke();
        }
    };

    useEffect(() => {
        if (!visible || !canvas) {
            return;
        }

        document.addEventListener("keydown", spaceFunction, false);

        const context = canvas.getContext("2d");

        let animationFrameId;

        const render = (time) => {
            draw(canvas, context, time);
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }
    }, [draw]);

    return (
        <Container>
            <Button onClick={showModal} disabled={!buttonEnabled}>Ready</Button>
            <Modal id={id} open={visible}>
                <canvas id={id} ref={setCanvasRef} width="400" height="400"/>
            </Modal>
        </Container>
    );
};

export default SpiralModal;
