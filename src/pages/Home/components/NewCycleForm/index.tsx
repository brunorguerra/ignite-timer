import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
import { useCyclesContext } from "../../../../context/CyclesContext";
import { useFormContext } from "react-hook-form";

export const NewCycleForm = () => {
    const { activeCycle } = useCyclesContext();
    const { register } = useFormContext();

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                type="text"
                id="task"
                list="task-suggestions"
                placeholder="Dê um nome para seu projeto"
                disabled={!!activeCycle}
                {...register("task")}
            />

            <datalist id="task-suggestions">
                <option value="Trabalhar em um Projeto Comercial" />
                <option value="Construir Aplicação React" />
            </datalist>

            <label htmlFor="minutesAmount">Durante</label>
            <MinutesAmountInput
                type="number"
                id="minutesAmount"
                placeholder="00"
                disabled={!!activeCycle}
                step={5}
                min={5}
                max={60}
                {...register("minutesAmount", { valueAsNumber: true })}
            />

            <span>minutos.</span>
        </FormContainer>
    );
};
