import React, { useEffect, useState } from 'react';
import { fetchTickets, Ticket } from '../../../services/ticketService'; // Adjust the import based on your service structure
import TicketItem from '../components/TicketItem'; // Assuming you have a TicketItem component for rendering individual tickets

const Tickets: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTickets = async () => {
            try {
                const fetchedTickets = await fetchTickets();
                setTickets(fetchedTickets);
            } catch (err) {
                setError('Failed to load tickets');
            } finally {
                setLoading(false);
            }
        };

        loadTickets();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Support Tickets</h1>
            <ul>
                {tickets.map(ticket => (
                    <TicketItem key={ticket.id} ticket={ticket} />
                ))}
            </ul>
        </div>
    );
};

export default Tickets;