import React, { useRef, useState, useEffect, useCallback } from "react";
import { Container, Button, Modal } from '@nextui-org/react';

const SpiralModal = ({ id }) => {
    const [canvas, setCanvas] = useState(null);
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);

    const setCanvasRef = useCallback(node => {
        if (node) {
            setCanvas(node);
        }
    }, []);

    const draw = (canvas, context, time) => {
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
    };

    useEffect(() => {
        if (!visible || !canvas) {
            return;
        }

        // const canvas = canvasRef.current;
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
        // TODO: disable this open and figure out how to check
        <Container>
            <Button onClick={showModal}>Ready</Button>
            <Modal id={id} open={visible}>
                <canvas id={id} ref={setCanvasRef} width="400" height="400"/>
            </Modal>
        </Container>
    );
};

export default SpiralModal;
