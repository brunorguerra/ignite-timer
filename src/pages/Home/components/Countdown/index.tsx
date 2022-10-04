import { differenceInSeconds } from "date-fns";
import { useEffect } from "react";
import { useCyclesContext } from "../../../../context/CyclesContext";
import { CountdownContainer, Separator } from "./styles";

export const Countdown = () => {
    const {
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
    } = useCyclesContext();

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, "0");
    const seconds = String(secondsAmount).padStart(2, "0");

    useEffect(() => {
        activeCycle
            ? (document.title = `Ignite Timer - ${minutes}:${seconds}`)
            : (document.title = "Ignite Timer");
    }, [minutes, seconds, activeCycle]);

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                    new Date(activeCycle.startDate)
                );

                if (secondsDifference >= totalSeconds) {
                    markCurrentCycleAsFinished();

                    setSecondsPassed(totalSeconds);
                    clearInterval(interval);
                } else {
                    setSecondsPassed(secondsDifference);
                }
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [
        activeCycle,
        totalSeconds,
        activeCycleId,
        setSecondsPassed,
        markCurrentCycleAsFinished,
    ]);

    return (
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    );
};
