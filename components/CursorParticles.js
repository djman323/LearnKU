'use client'

import { useEffect, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CursorParticles() {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Create multiple particles with different spring physics for a "swarm" feel
    const particles = Array.from({ length: 6 }).map((_, i) => {
        return {
            x: useSpring(mouseX, { stiffness: 50 + i * 20, damping: 20 + i * 5 }),
            y: useSpring(mouseY, { stiffness: 50 + i * 20, damping: 20 + i * 5 }),
            size: 4 + Math.random() * 4,
            delay: i * 0.05
        }
    })

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    return (
        <div className="cursor-particles-container" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 9999,
            overflow: 'hidden'
        }}>
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    style={{
                        x: p.x,
                        y: p.y,
                        position: 'absolute',
                        width: p.size,
                        height: p.size,
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-1)',
                        opacity: 0.6 - (i * 0.08),
                        boxShadow: `0 0 ${10 + i * 2}px var(--accent-1)`,
                    }}
                />
            ))}
        </div>
    )
}
