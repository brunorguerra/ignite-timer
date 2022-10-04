import { differenceInSeconds } from "date-fns";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import {
    addNewCycleAction,
    interruptCurrentCycleAction,
    markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";
import { Cycle, cyclesReducers } from "../reducers/cycles/reducer";

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

type CyclesProviderProps = {
    children: ReactNode;
};

interface CyclesContextData {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
    amountSecondsPassed: number;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
}

const CyclesContext = createContext({} as CyclesContextData);

export function CyclesProvider({ children }: CyclesProviderProps) {
    const [cyclesState, dispatch] = useReducer(
        cyclesReducers,
        {
            cycles: [],
            activeCycleId: null,
        },
        () => {
            const storadLocalAsJSON = localStorage.getItem(
                "@igniteTimer:cycles-state/v1.0"
            );

            if (storadLocalAsJSON) {
                return JSON.parse(storadLocalAsJSON);
            }

            return {
                cycles: [],
                activeCycleId: null,
            };
        }
    );

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(
                new Date(),
                new Date(activeCycle.startDate)
            );
        }

        return 0;
    });

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction());
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        };

        dispatch(addNewCycleAction(newCycle));

        setAmountSecondsPassed(0);
    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction());
    }

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState);

        localStorage.setItem("@igniteTimer:cycles-state/v1.0", stateJSON);
    }, [cyclesState]);

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                markCurrentCycleAsFinished,
                amountSecondsPassed,
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle,
            }}
        >
            {children}
        </CyclesContext.Provider>
    );
}

export const useCyclesContext = () => {
    return useContext(CyclesContext);
};
