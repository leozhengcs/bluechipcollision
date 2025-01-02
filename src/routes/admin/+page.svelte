<script>
    let name = '';
    let email = '';
    let message = '';
    let success = '';
    let error = '';

    async function submitForm() {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });

        if (response.ok) {
            success = 'Submitted!';
            error = '';
        } else {
            error = 'Error submitting form.';
            success = '';
        }
    }
</script>

<form on:submit|preventDefault={submitForm}>
    <input type="text" placeholder="Name" bind:value={name} required />
    <input type="email" placeholder="Email" bind:value={email} required />
    <textarea placeholder="Message" bind:value={message} required></textarea>
    <button type="submit">Submit</button>
</form>

{#if success}<p>{success}</p>{/if}
{#if error}<p>{error}</p>{/if}
