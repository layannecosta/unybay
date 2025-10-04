import { IoTrashOutline, IoPencilOutline } from "react-icons/io5"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Modal from 'react-modal';
import { removeApiProduct } from "./services";
import { toastService } from "../../utils/toastConfig";
import { getApiMyProducts } from "../../pages/user-products/services";
import { CardProps } from "./types";
import { useAuthSessionStore } from "../../hooks/use-auth-session/use-auth-session";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export default function CardProductAdmin(props: CardProps) {
    const { token } = useAuthSessionStore();

    const [modalIsOpen, setIsOpen] = useState(false);

    const navigate = useNavigate()

    async function removeProduct() {
        try {
            await removeApiProduct(props.id, token);
            const response = await getApiMyProducts(token);
            props.setMyProducts(response.data);
            toastService.success("Produto removido com sucesso!");
            setIsOpen(false);
        } catch (error) {
            toastService.apiError(error, "Erro ao remover produto");
        }
    }

    const handleEdit = () => {
        navigate("/form-products");
    }

    return (
        <div className="group relative flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 w-full max-w-sm">
            {/* Container da imagem */}
            <div className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center min-h-[180px]">
                <img
                    className="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110"
                    src={props.img}
                    alt={props.name}
                />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Conteúdo do card */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                    <h1 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-primary transition-colors duration-200">
                        {props.name}
                    </h1>
                    <p className="text-sm text-gray-600">Fabricante: {props.manufacturer}</p>
                </div>

                {/* Preço */}
                <div className="space-y-1">
                    <p className="text-2xl font-bold text-primary">R$ {props.price.toFixed(2)}</p>
                </div>

                {/* Botões de ação */}
                <div className="pt-3 space-y-2">
                    <button
                        onClick={() => navigate(`/form-products-edit/${props.id}`)}
                        className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                        <IoPencilOutline className="text-xl" />
                        Editar Produto
                    </button>
                    <div>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="w-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <IoTrashOutline className="text-xl" />
                            Excluir Produto
                        </button>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={() => setIsOpen(false)}
                            style={customStyles}
                        >
                            <h1 className="text-[20px] font-bold text-center">Excluir produto</h1>
                            <p className="text-center">Deseja realmente excluir este produto?</p>
                            <div className="flex justify-center gap-4 mt-4">
                                <button
                                    onClick={removeProduct}
                                    className="bg-primary text-white px-8 py-2 rounded-lg">
                                    Sim
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="bg-white text-primary border border-primary px-8 py-2 rounded-lg">
                                    Não
                                </button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>

            {/* Indicador de status */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-500"></div>
        </div>
    )
}