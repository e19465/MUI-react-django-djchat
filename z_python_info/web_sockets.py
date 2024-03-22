"""

A WebSocket is a protocol that enables real-time, bidirectional communication between a client and a server over a single, long-lived connection. It's ideal for applications requiring low-latency, interactive data exchange, like chat apps and live updates.

1. Real-time Updates: Push live updates to clients, avoiding constant polling.
2. Collaborative Editing: Sync edits from multiple users in real-time.
3. Live Notifications: Send instant alerts like messages or system notifications.
4. Online Gaming: Support real-time multiplayer interactions.
5. Dashboard Updates: Update data visualizations without page refresh.
6. IoT Applications: Stream data from sensors or devices to a server.
7. Live Customer Support: Enable real-time chat for customer assistance.
8. Financial Trading: Stream real-time market data to traders for quick decisions.








==== HTTP ====

    - Request-Response: Clients send requests, servers respond.
    - Stateless: No persistent connection, each request is independent.
    - Text-Based: Messages are typically text-based.
    - Client-Initiated: Communication initiated by clients.
    - One-Way: Servers can't push data without a new request.


==== WebSocket ====

    - Bi-Directional: Both clients and servers can send messages.
    - Persistent Connection: Maintains a persistent connection.
    - Low Latency: Faster real-time communication.
    - Binary and Text: Supports both data types.
    - Event-Driven: Facilitates instant data push from servers.

    
"""